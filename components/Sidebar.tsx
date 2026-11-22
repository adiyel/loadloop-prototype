"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PackageSearch, Map, LogOut, ShieldCheck, Truck, PlusCircle, FileText, Wallet, User, AlertCircle } from "lucide-react";
import Logo from "./Logo";

export default function Sidebar() {
  const pathname = usePathname();

  const msmeLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/create", label: "Create Shipment", icon: PlusCircle },
    { href: "/dashboard/shipments", label: "My Shipments", icon: PackageSearch },
    { href: "/dashboard/loadboard", label: "Load Board", icon: Map },
    { href: "/dashboard/billing", label: "Payments", icon: Wallet },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const operatorLinks = [
    { href: "/operator", label: "Operator Dashboard", icon: LayoutDashboard },
    { href: "/operator/trucks", label: "My Trucks", icon: Truck },
    { href: "/operator/routes", label: "Route Management", icon: Map },
    { href: "/operator/requests", label: "Shipment Requests", icon: AlertCircle },
    { href: "/operator/earnings", label: "Earnings", icon: FileText },
  ];

  const adminLinks = [
    { href: "/admin", label: "Admin Console", icon: ShieldCheck },
    { href: "/admin/users", label: "User Management", icon: User },
    { href: "/admin/verification", label: "Truck Verification", icon: FileText },
    { href: "/admin/bookings", label: "Transactions", icon: Wallet },
  ];

  const renderLinks = (links: any[], title: string) => (
    <div className="space-y-1">
      <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">{title}</p>
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${active ? "bg-brand-navy text-white shadow-sm" : "text-slate-500 hover:bg-brand-light hover:text-brand-navy"}`}>
            <Icon size={18} className={active ? "text-brand-orange" : ""} /> {label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white h-screen sticky top-0 overflow-y-auto">
      <div className="flex h-20 items-center px-6 border-b border-slate-100 shrink-0">
        <Logo />
      </div>
      <nav className="flex-1 p-4">
        {renderLinks(msmeLinks, "MSME Portal")}
        {renderLinks(operatorLinks, "Operator Portal")}
        {renderLinks(adminLinks, "Admin System")}
      </nav>
      <div className="p-4 border-t border-slate-100 shrink-0">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-brand-light hover:text-rose-500 transition-colors">
          <LogOut size={18} /> Log out
        </Link>
      </div>
    </aside>
  );
}
