"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

export default function LoadBoard() {
  const { trucks, shipments, createBooking } = useApp();
  const router = useRouter();
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  
  const pendingShipment = shipments.find(s => s.status === "Pending");
  const validTrucks = trucks.filter(t => t.verificationStatus === "Verified" && t.currentWeight < t.maxWeight && t.currentVolume < t.maxVolume);

  const handleBook = (truckId: string) => {
    if (!pendingShipment) return;
    createBooking(pendingShipment.id, truckId, 3200);
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
        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-200">You have no pending shipments to match.</div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {validTrucks.map((truck) => {
          const availableWeight = truck.maxWeight - truck.currentWeight;
          const availableVolume = truck.maxVolume - truck.currentVolume;
          
          // Validation logic
          const isOverWeight = pendingShipment && pendingShipment.weight > availableWeight;
          const isOverVolume = pendingShipment && pendingShipment.volume > availableVolume;
          const isInvalid = isOverWeight || isOverVolume;

          return (
            <div key={truck.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-lg text-brand-navy">{truck.route}</p>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Calendar size={14}/> {truck.departure}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">95% match</span>
                </div>
                <div className="grid grid-cols-2 gap-2 py-4 border-y border-slate-100 my-4">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Avail. Weight</p>
                    <p className={`font-bold ${isOverWeight ? 'text-rose-500' : 'text-brand-navy'}`}>{availableWeight} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Avail. Volume</p>
                    <p className={`font-bold ${isOverVolume ? 'text-rose-500' : 'text-brand-navy'}`}>{availableVolume} m³</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedTruck(truck.id)}
                disabled={!pendingShipment || isInvalid}
                className={`w-full py-2.5 rounded-lg border-2 font-semibold transition ${
                  !pendingShipment ? "border-slate-100 text-slate-400 cursor-not-allowed" :
                  isInvalid ? "border-rose-200 text-rose-500 bg-rose-50 cursor-not-allowed" :
                  "border-slate-100 text-brand-navy hover:bg-brand-orange hover:border-brand-orange hover:text-white"
                }`}
              >
                {!pendingShipment ? "No Pending Shipment" : isOverWeight ? "Exceeds Weight Limit" : isOverVolume ? "Exceeds Volume Limit" : "Select Truck"}
              </button>
            </div>
          );
        })}
      </div>

      {selectedTruck && pendingShipment && (
        <div className="fixed inset-0 bg-brand-navy/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Confirm Booking</h2>
            <div className="bg-brand-light p-4 rounded-xl mb-6">
              <div className="flex justify-between mb-2"><span className="text-slate-500">Base Cost</span><span className="font-semibold">₱3,200</span></div>
              <div className="flex justify-between mb-2"><span className="text-slate-500">Platform Fee (5%)</span><span className="font-semibold">₱160</span></div>
              <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-bold text-brand-navy"><span>Total Payment</span><span>₱3,360</span></div>
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
