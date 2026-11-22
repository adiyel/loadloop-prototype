"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PackageSearch, Map, Settings, LogOut } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/loadboard", label: "Load Board", icon: PackageSearch },
  { href: "/tracking", label: "Live Tracking", icon: Map },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white h-screen sticky top-0">
      <div className="flex h-20 items-center px-6 border-b border-slate-100">
        <Logo />
      </div>
      <nav className="flex-1 space-y-2 p-4 mt-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active ? "bg-brand-navy text-white shadow-md" : "text-slate-500 hover:bg-brand-light hover:text-brand-navy"
              }`}
            >
              <Icon size={20} className={active ? "text-brand-orange" : ""} /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-100 space-y-2">
        <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-brand-light">
          <Settings size={20} /> Settings
        </Link>
        <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-brand-light hover:text-rose-500 transition-colors">
          <LogOut size={20} /> Log out
        </Link>
      </div>
    </aside>
  );
}
