// ============================================================
// Gilgil Day Senior School — Admin CMS API
// Cloudflare Pages Function (catch-all under /api/*)
// Bindings required: DB (D1 database), MEDIA (R2 bucket)
// ============================================================

const COOKIE = "gdss_admin";
const SESSION_DAYS = 7;

// Whitelisted resources → columns admins may write. Prevents SQL injection.
const RESOURCES = {
  news: ["slug", "title", "category", "date", "excerpt", "body", "photo", "featured", "published"],
  gallery: ["title", "filter", "photo", "sort"],
  downloads: ["name", "category", "size", "url", "restricted", "sort"],
  people: ["name", "role", "short", "section", "photo", "message", "sort"],
  council: ["name", "role", "photo", "sort"],
  achievers: ["position", "grade", "destination", "note", "photo", "sort"],
};

// ---------------- helpers ----------------
const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

const err = (message, status = 400) => json({ error: message }, status);

function getCookie(request, name) {
  const raw = request.headers.get("Cookie") || "";
  const m = raw.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? m[1] : null;
}

async function pbkdf2(password, saltHex) {
  const enc = new TextEncoder();
  const salt = new Uint8Array(saltHex.match(/.{2}/g).map((b) => parseInt(b, 16)));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100000 },
    key,
    256
  );
  return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomHex(bytes) {
  const a = crypto.getRandomValues(new Uint8Array(bytes));
  return [...a].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function requireAdmin(request, env) {
  const token = getCookie(request, COOKIE);
  if (!token) return null;
  const row = await env.DB.prepare(
    "SELECT a.id, a.email, a.name FROM sessions s JOIN admins a ON a.id = s.admin_id WHERE s.token = ? AND s.expires_at > ?"
  ).bind(token, Date.now()).first();
  return row || null;
}

// ---------------- main router ----------------
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, "");
  const method = request.method;

  try {
    // ---------- public: serve media from R2 ----------
    if (path.startsWith("/media/") && method === "GET") {
      const key = decodeURIComponent(path.slice("/media/".length));
      const obj = await env.MEDIA.get(key);
      if (!obj) return err("File not found", 404);
      const headers = new Headers();
      obj.writeHttpMetadata(headers);
      headers.set("Cache-Control", "public, max-age=3600");
      if (url.searchParams.get("dl")) {
        headers.set("Content-Disposition", `attachment; filename="${key.split("/").pop()}"`);
      }
      return new Response(obj.body, { headers });
    }

    // ---------- public: full content bundle ----------
    if (path === "/content" && method === "GET") {
      const [news, gallery, downloads, people, council, achievers, settings] = await Promise.all([
        env.DB.prepare("SELECT * FROM news WHERE published = 1 ORDER BY date DESC, id DESC").all(),
        env.DB.prepare("SELECT * FROM gallery ORDER BY sort, id").all(),
        env.DB.prepare("SELECT * FROM downloads ORDER BY sort, id").all(),
        env.DB.prepare("SELECT * FROM people ORDER BY sort, id").all(),
        env.DB.prepare("SELECT * FROM council ORDER BY sort, id").all(),
        env.DB.prepare("SELECT * FROM achievers ORDER BY sort, id").all(),
        env.DB.prepare("SELECT key, value FROM settings").all(),
      ]);
      const settingsObj = {};
      for (const s of settings.results) settingsObj[s.key] = s.value;
      return json(
        {
          news: news.results,
          gallery: gallery.results,
          downloads: downloads.results,
          people: people.results,
          council: council.results,
          achievers: achievers.results,
          settings: settingsObj,
        },
        200,
        { "Cache-Control": "no-store" }
      );
    }

    // ---------- auth ----------
    if (path === "/auth/login" && method === "POST") {
      const { email, password } = await request.json();
      if (!email || !password) return err("Email and password are required");
      const admin = await env.DB.prepare("SELECT * FROM admins WHERE email = ?").bind(email.trim().toLowerCase()).first();
      if (!admin) return err("Invalid email or password", 401);
      const hash = await pbkdf2(password, admin.salt);
      if (hash !== admin.password_hash) return err("Invalid email or password", 401);
      const token = randomHex(32);
      const expires = Date.now() + SESSION_DAYS * 86400 * 1000;
      await env.DB.prepare("INSERT INTO sessions (token, admin_id, expires_at) VALUES (?, ?, ?)").bind(token, admin.id, expires).run();
      await env.DB.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(Date.now()).run();
      return json(
        { ok: true, admin: { id: admin.id, email: admin.email, name: admin.name } },
        200,
        { "Set-Cookie": `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_DAYS * 86400}` }
      );
    }

    if (path === "/auth/logout" && method === "POST") {
      const token = getCookie(request, COOKIE);
      if (token) await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
      return json({ ok: true }, 200, { "Set-Cookie": `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0` });
    }

    if (path === "/auth/me" && method === "GET") {
      const admin = await requireAdmin(request, env);
      if (!admin) return err("Not signed in", 401);
      return json({ admin });
    }

    // ---------- everything below requires an admin session ----------
    if (!path.startsWith("/admin/")) return err("Not found", 404);
    const admin = await requireAdmin(request, env);
    if (!admin) return err("Not signed in", 401);

    // ----- file upload → R2 -----
    if (path === "/admin/upload" && method === "POST") {
      const form = await request.formData();
      const file = form.get("file");
      if (!file || typeof file === "string") return err("No file provided");
      const safeName = file.name.replace(/[^A-Za-z0-9._-]/g, "_");
      const key = `m/${Date.now()}-${safeName}`;
      await env.MEDIA.put(key, file.stream(), {
        httpMetadata: { contentType: file.type || "application/octet-stream" },
      });
      const kb = Math.max(1, Math.round(file.size / 1024));
      const size = kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
      const ext = (safeName.split(".").pop() || "").toUpperCase();
      return json({ ok: true, url: `/api/media/${key}`, size: `${ext} · ${size}` });
    }

    // ----- settings (logo, captain message, achievers text...) -----
    if (path === "/admin/settings" && method === "POST") {
      const { key, value } = await request.json();
      if (!key) return err("Setting key required");
      await env.DB.prepare(
        "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
      ).bind(String(key), String(value ?? "")).run();
      return json({ ok: true });
    }

    // ----- admin account management -----
    if (path === "/admin/admins") {
      if (method === "GET") {
        const rows = await env.DB.prepare("SELECT id, email, name, created_at FROM admins ORDER BY id").all();
        return json({ admins: rows.results });
      }
      if (method === "POST") {
        const { email, name, password } = await request.json();
        if (!email || !name || !password) return err("Email, name and password are required");
        if (password.length < 8) return err("Password must be at least 8 characters");
        const salt = randomHex(16);
        const hash = await pbkdf2(password, salt);
        try {
          await env.DB.prepare("INSERT INTO admins (email, name, password_hash, salt) VALUES (?, ?, ?, ?)")
            .bind(email.trim().toLowerCase(), name.trim(), hash, salt).run();
        } catch {
          return err("An admin with that email already exists");
        }
        return json({ ok: true });
      }
      if (method === "DELETE") {
        const id = Number(url.searchParams.get("id"));
        if (id === admin.id) return err("You cannot delete your own account");
        const count = await env.DB.prepare("SELECT COUNT(*) AS n FROM admins").first();
        if (count.n <= 1) return err("At least one admin account must remain");
        await env.DB.prepare("DELETE FROM admins WHERE id = ?").bind(id).run();
        await env.DB.prepare("DELETE FROM sessions WHERE admin_id = ?").bind(id).run();
        return json({ ok: true });
      }
    }

    if (path === "/admin/password" && method === "POST") {
      const { current, next } = await request.json();
      if (!next || next.length < 8) return err("New password must be at least 8 characters");
      const me = await env.DB.prepare("SELECT * FROM admins WHERE id = ?").bind(admin.id).first();
      const currentHash = await pbkdf2(current || "", me.salt);
      if (currentHash !== me.password_hash) return err("Current password is incorrect", 401);
      const salt = randomHex(16);
      const hash = await pbkdf2(next, salt);
      await env.DB.prepare("UPDATE admins SET password_hash = ?, salt = ? WHERE id = ?").bind(hash, salt, admin.id).run();
      return json({ ok: true });
    }

    // ----- generic whitelisted CRUD: /admin/<resource> -----
    const resource = path.slice("/admin/".length).split("/")[0];
    const columns = RESOURCES[resource];
    if (!columns) return err("Unknown resource", 404);

    if (method === "GET") {
      const order = resource === "news" ? "date DESC, id DESC" : "sort, id";
      const rows = await env.DB.prepare(`SELECT * FROM ${resource} ORDER BY ${order}`).all();
      return json({ items: rows.results });
    }

    if (method === "POST") {
      const body = await request.json();
      const data = {};
      for (const c of columns) if (c in body) data[c] = body[c] ?? null;
      if (resource === "news" && data.slug) {
        data.slug = String(data.slug).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
      const keys = Object.keys(data);
      if (keys.length === 0) return err("No valid fields supplied");
      if (body.id) {
        const sets = keys.map((k) => `${k} = ?`).join(", ");
        await env.DB.prepare(`UPDATE ${resource} SET ${sets} WHERE id = ?`)
          .bind(...keys.map((k) => data[k]), Number(body.id)).run();
        return json({ ok: true, id: Number(body.id) });
      }
      const placeholders = keys.map(() => "?").join(", ");
      const res = await env.DB.prepare(`INSERT INTO ${resource} (${keys.join(", ")}) VALUES (${placeholders})`)
        .bind(...keys.map((k) => data[k])).run();
      return json({ ok: true, id: res.meta.last_row_id });
    }

    if (method === "DELETE") {
      const id = Number(url.searchParams.get("id"));
      if (!id) return err("id query parameter required");
      await env.DB.prepare(`DELETE FROM ${resource} WHERE id = ?`).bind(id).run();
      return json({ ok: true });
    }

    return err("Method not allowed", 405);
  } catch (e) {
    return err(`Server error: ${e.message}`, 500);
  }
}
