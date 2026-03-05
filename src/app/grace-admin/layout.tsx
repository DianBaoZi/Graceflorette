export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout logic handled by middleware and individual page layouts
  return <>{children}</>;
}
