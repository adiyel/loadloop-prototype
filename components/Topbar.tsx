"use client";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="flex h-20 items-center justify-between px-8 bg-white border-b border-slate-200 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-brand-navy">
          {isAdmin ? "System Administrator" : "Good Morning, Alex"}
        </h1>
        <p className="text-sm text-slate-500">
          {isAdmin ? "Platform overview and user management." : "Here is what is happening with your logistics today."}
        </p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={isAdmin ? "Search users, operators..." : "Search shipments, trucks..."}
            className="w-72 rounded-full bg-brand-light py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>
        <button className="relative text-slate-500 hover:text-brand-navy transition">
          <Bell size={24} />
          <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-brand-orange border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">{isAdmin ? "Admin User" : "Alex Morgan"}</p>
            <p className="text-xs text-slate-500">{isAdmin ? "System Admin" : "MSME Owner"}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold">
            {isAdmin ? "AD" : "AM"}
          </div>
        </div>
      </div>
    </header>
  );
}
