import { redirect } from "next/navigation";

// Login moved to /giris (shared by admins, teachers and students).
export default function AdminLoginRedirect() {
  redirect("/giris");
}
