"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, Package, Users, LayoutDashboard, Home } from "lucide-react";

const userLinks = [
  { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/book", label: "Book Shipment", icon: Package },
  { href: "/user/shipments", label: "My Shipments", icon: Truck },
];
const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/shipments", label: "Shipments", icon: Truck },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function Sidebar({ mode }: { mode: "user" | "admin" }) {
  const pathname = usePathname();
  const links = mode === "user" ? userLinks : adminLinks;

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-200">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white font-bold">LL</div>
        <div>
          <p className="font-semibold leading-tight">LoadLoop</p>
          <p className="text-xs text-slate-500 capitalize">{mode} portal</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} /> {label}
            </Link>
          );
        })}
      </nav>
      <Link href="/" className="m-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
        <Home size={18} /> Switch Portal
      </Link>
    </aside>
  );
}
