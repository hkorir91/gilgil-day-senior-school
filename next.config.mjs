/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",           // static site for Cloudflare Pages (API lives in /functions)
  images: { unoptimized: true },
};
export default nextConfig;
