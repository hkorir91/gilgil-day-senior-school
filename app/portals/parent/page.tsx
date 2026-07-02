import LoginForm from "@/components/portal/LoginForm";
export const metadata = { title: "Parent Portal" };
export default function Page() {
  return <LoginForm role="parent" title="Parent Portal" intro="Announcements, circulars, class results, fees information and direct communication with the school." />;
}
