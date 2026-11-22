"use client";
import { Bell, Search, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

export default function Topbar() {
  const pathname = usePathname();
  const { notifications, markNotificationRead } = useApp();
  const [showNotifs, setShowNotifs] = useState(false);
  const isAdmin = pathname.startsWith("/admin");
  const isOperator = pathname.startsWith("/operator");
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="flex h-20 items-center justify-between px-8 bg-white border-b border-slate-200 sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold text-brand-navy">
          {isAdmin ? "System Administrator" : isOperator ? "Operator Portal" : "Good Morning, Alex"}
        </h1>
        <p className="text-sm text-slate-500">
          {isAdmin ? "Platform overview." : isOperator ? "Manage your fleet and bookings." : "Here is your logistics overview."}
        </p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search..." className="w-64 rounded-full bg-brand-light py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        </div>
        
        {/* Notifications Dropdown */}
        <div className="relative">
          <button onClick={() => setShowNotifs(!showNotifs)} className="relative text-slate-500 hover:text-brand-navy transition">
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-orange text-white text-xs flex items-center justify-center border-2 border-white font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifs && (
            <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <p className="font-bold text-brand-navy">Notifications</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-sm text-slate-500">No new notifications</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition ${!n.read ? "bg-blue-50/50" : ""}`}>
                      <div className="flex gap-3">
                        <div className={`mt-1 shrink-0 ${n.type === 'booking' ? 'text-brand-orange' : 'text-brand-blue'}`}><CheckCircle2 size={16}/></div>
                        <div>
                          <p className="text-sm font-semibold text-brand-navy">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                          <p className="text-[10px] text-slate-400 mt-2">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
