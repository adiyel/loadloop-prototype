import Sidebar from "@/components/Sidebar";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar mode="admin" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
