"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Edit2, PlusCircle } from "lucide-react";

export default function RouteManagement() {
  const { trucks } = useApp();
  const [editingTruck, setEditingTruck] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-navy">Route & Capacity Management</h1>
        <button className="flex items-center gap-2 bg-brand-navy text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 transition">
          <PlusCircle size={18}/> Publish New Route
        </button>
      </div>
      
      <div className="grid gap-4">
        {trucks.map(t => {
          const weightPercent = (t.currentWeight / t.maxWeight) * 100;
          const volumePercent = (t.currentVolume / t.maxVolume) * 100;
          
          return (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-lg text-brand-navy">{t.route}</p>
                  <p className="text-sm text-slate-500">{t.id} - {t.plate} ({t.type})</p>
                </div>
                <button onClick={() => setEditingTruck(t.id)} className="flex items-center gap-1 text-brand-blue text-sm font-semibold hover:underline">
                  <Edit2 size={14}/> Edit Truck
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Weight: {t.currentWeight} / {t.maxWeight} kg</span>
                    <span>{Math.round(weightPercent)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${weightPercent > 80 ? 'bg-brand-orange' : 'bg-brand-blue'}`} style={{ width: `${weightPercent}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Volume: {t.currentVolume} / {t.maxVolume} m³</span>
                    <span>{Math.round(volumePercent)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${volumePercent > 80 ? 'bg-brand-orange' : 'bg-brand-blue'}`} style={{ width: `${volumePercent}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Edit Modal placeholder for prototype */}
      {editingTruck && (
        <div className="fixed inset-0 bg-brand-navy/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full">
            <h3 className="font-bold text-lg mb-2">Edit Truck {editingTruck}</h3>
            <p className="text-sm text-slate-500 mb-4">In a production app, this opens a form to update the max weight and volume.</p>
            <button onClick={() => setEditingTruck(null)} className="w-full bg-brand-navy text-white py-2 rounded-lg font-semibold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
