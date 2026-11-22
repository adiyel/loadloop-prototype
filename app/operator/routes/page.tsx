"use client";
import { useApp } from "@/context/AppContext";
import { Truck, CheckCircle2, AlertCircle } from "lucide-react";

export default function RouteManagement() {
  const { trucks } = useApp();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Route & Capacity Management</h1>
      
      <div className="grid gap-4">
        {trucks.map(t => {
          const occupiedPercentage = (t.currentLoad / t.maxCapacity) * 100;
          return (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-lg text-brand-navy">{t.route}</p>
                  <p className="text-sm text-slate-500">{t.id} - {t.plate} ({t.type})</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{t.status}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Capacity Used: {t.currentLoad} kg / {t.maxCapacity} kg</span>
                  <span>{Math.round(occupiedPercentage)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className={`h-3 rounded-full transition-all ${occupiedPercentage > 80 ? 'bg-brand-orange' : 'bg-brand-blue'}`} style={{ width: `${occupiedPercentage}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
