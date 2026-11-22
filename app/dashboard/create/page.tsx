"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function CreateShipment() {
  const router = useRouter();
  const { addShipment } = useApp();
  
  // Keep the form state as strings so the inputs behave normally
  const [formData, setFormData] = useState({ 
    origin: "", 
    dest: "", 
    cargo: "", 
    weight: "", 
    date: "" 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert the weight string to a number before passing to context
    addShipment({
      ...formData,
      weight: Number(formData.weight)
    });
    
    router.push("/dashboard/shipments");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-brand-navy mb-2">Create Shipment</h1>
      <p className="text-slate-500 mb-6">Enter your cargo details to find a matching shared truck.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Pickup City</label>
            <input required type="text" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, origin: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Destination City</label>
            <input required type="text" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, dest: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Cargo Description</label>
          <input required type="text" placeholder="e.g., 4 boxes of furniture" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, cargo: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Weight (kg)</label>
            <input required type="number" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, weight: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Delivery Date</label>
            <input required type="date" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
        </div>
        <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition mt-4">
          Find Matching Trucks
        </button>
      </form>
    </div>
  );
}
