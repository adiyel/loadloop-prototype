"use client";
import { useApp } from "@/context/AppContext";
import { Truck, Wallet, Package } from "lucide-react";

export default function OperatorDashboard() {
  const { trucks } = useApp();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Operator Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div><p className="text-sm font-semibold text-slate-500">Registered Trucks</p><p className="text-3xl font-bold mt-2 text-brand-navy">{trucks.length}</p></div>
          <div className="p-3 bg-brand-light text-brand-blue rounded-xl"><Truck size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div><p className="text-sm font-semibold text-slate-500">Active Bookings</p><p className="text-3xl font-bold mt-2 text-brand-navy">3</p></div>
          <div className="p-3 bg-brand-light text-brand-blue rounded-xl"><Package size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div><p className="text-sm font-semibold text-slate-500">Est. Earnings</p><p className="text-3xl font-bold mt-2 text-brand-navy">₱45,200</p></div>
          <div className="p-3 bg-brand-light text-brand-blue rounded-xl"><Wallet size={24} /></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-bold text-lg mb-4 text-brand-navy">My Fleet</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {trucks.map(t => (
            <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-brand-navy">{t.id} ({t.plate})</p>
                <span className={`px-2 py-1 rounded text-xs font-bold ${t.status === "Available" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{t.status}</span>
              </div>
              <p className="text-sm text-slate-600">{t.type} - {t.capacity}</p>
              <p className="text-sm text-slate-500 mt-2">Route: {t.route} ({t.departure})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
