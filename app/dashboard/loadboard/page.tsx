"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Weight, Calendar } from "lucide-react";

export default function LoadBoard() {
  const { trucks, shipments, createBooking } = useApp();
  const router = useRouter();
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  
  // For prototype purposes, match against the most recent pending shipment
  const pendingShipment = shipments.find(s => s.status === "Pending");

  const handleBook = (truckId: string) => {
    if (!pendingShipment) return alert("Please create a shipment first.");
    const estimatedCost = 3200; // Simulated pricing
    createBooking(pendingShipment.id, truckId, estimatedCost);
    setSelectedTruck(null);
    router.push("/dashboard/shipments");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Load Board</h1>
          <p className="text-slate-500">Find matching trucks for your pending shipments.</p>
        </div>
      </div>

      {!pendingShipment && (
        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-200">
          You have no pending shipments to match. Please create a shipment first.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trucks.filter(t => t.currentLoad < t.maxCapacity).map((truck) => {
          const availableCapacity = truck.maxCapacity - truck.currentLoad;
          const matchPercentage = 95; // Simulated match score

          return (
            <div key={truck.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-lg text-brand-navy">{truck.route}</p>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Calendar size={14}/> {truck.departure}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">{matchPercentage}% match</span>
                </div>
                <div className="grid grid-cols-2 gap-2 py-4 border-y border-slate-100 my-4">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Available Cap.</p>
                    <p className="font-bold text-brand-navy">{availableCapacity} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Truck Type</p>
                    <p className="font-bold text-brand-navy">{truck.type}</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedTruck(truck.id)}
                disabled={!pendingShipment || pendingShipment.weight > availableCapacity}
                className="w-full py-2.5 rounded-lg border-2 border-slate-100 font-semibold text-brand-navy hover:bg-brand-orange hover:border-brand-orange hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {pendingShipment && pendingShipment.weight > availableCapacity ? "Insufficient Capacity" : "Select Truck"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {selectedTruck && (
        <div className="fixed inset-0 bg-brand-navy/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Confirm Booking</h2>
            <p className="text-slate-600 mb-6">You are booking space on truck <span className="font-bold text-brand-navy">{selectedTruck}</span> for shipment <span className="font-bold text-brand-navy">{pendingShipment?.id}</span>.</p>
            
            <div className="bg-brand-light p-4 rounded-xl mb-6">
              <div className="flex justify-between mb-2"><span className="text-slate-500">Base Cost</span><span className="font-semibold">₱3,200</span></div>
              <div className="flex justify-between mb-2"><span className="text-slate-500">Platform Fee (5%)</span><span className="font-semibold">₱160</span></div>
              <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-bold text-brand-navy"><span>Total</span><span>₱3,360</span></div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSelectedTruck(null)} className="flex-1 py-2.5 rounded-lg border border-slate-200 font-semibold hover:bg-slate-50 transition">Cancel</button>
              <button onClick={() => handleBook(selectedTruck)} className="flex-1 py-2.5 rounded-lg bg-brand-orange text-white font-bold hover:bg-orange-600 transition">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
