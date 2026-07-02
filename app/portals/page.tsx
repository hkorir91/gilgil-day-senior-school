import LoginForm from "@/components/portal/LoginForm";
export const metadata = { title: "Student LMS" };
export default function Page() {
  return <LoginForm role="student" title="Student LMS" intro="Notes, assignments, quizzes, past papers, progress tracking and career resources for learners." />;
}
