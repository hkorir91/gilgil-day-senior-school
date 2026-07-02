import LoginForm from "@/components/portal/LoginForm";
export const metadata = { title: "Staff Portal" };
export default function Page() {
  return <LoginForm role="staff" title="Staff Portal" intro="Teaching resources, class administration and school communication for teachers of Gilgil Day Senior School." />;
}
