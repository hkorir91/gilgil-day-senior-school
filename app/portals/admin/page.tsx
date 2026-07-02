import LoginForm from "@/components/portal/LoginForm";
export const metadata = { title: "Admin Login" };
export default function Page() {
  return <LoginForm role="admin" title="Admin Login" intro="Platform administration: users, content, results uploads, downloads, meetings and every public section." />;
}
