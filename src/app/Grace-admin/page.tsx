import { redirect } from "next/navigation";

export default function AdminDashboard() {
  // Redirect to products page
  redirect("/Grace-admin/products");
}
