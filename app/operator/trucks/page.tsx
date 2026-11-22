"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function RegisterTruck() {
  const router = useRouter();
  const { addTruck } = useApp();
  const [formData, setFormData] = useState({ 
    plate: "", 
    type: "Closed Van", 
    maxCapacity: "", // Changed to match new type
    route: "", 
    departure: "" 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert maxCapacity from string to number as expected by the context
    addTruck({
      ...formData,
      maxCapacity: Number(formData.maxCapacity)
    });
    router.push("/operator");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-brand-navy mb-2">Register New Truck</h1>
      <p className="text-slate-500 mb-6">Add a vehicle to your fleet and publish its available capacity.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Plate Number</label>
            <input required type="text" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, plate: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Truck Type</label>
            <select className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, type: e.target.value})}>
              <option>Closed Van</option><option>Flatbed</option><option>Reefer</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Max Capacity (kg)</label>
          <input required type="number" placeholder="e.g., 2000" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, maxCapacity: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Assigned Route</label>
            <input required type="text" placeholder="Manila - Batangas" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, route: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Departure Schedule</label>
            <input required type="text" placeholder="Daily 8:00 AM" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, departure: e.target.value})} />
          </div>
        </div>
        <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition mt-4">
          Publish Capacity
        </button>
      </form>
    </div>
  );
}
