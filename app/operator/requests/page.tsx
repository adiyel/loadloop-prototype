"use client";
import { useApp } from "@/context/AppContext";
import { Check, X, Box } from "lucide-react";

export default function ShipmentRequests() {
  const { bookings, shipments, updateBookingStatus } = useApp();
  const pendingBookings = bookings.filter(b => b.status === "Pending");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Shipment Requests</h1>
      <p className="text-slate-500">Review incoming bookings from MSMEs.</p>

      <div className="space-y-4">
        {pendingBookings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
            No pending requests at the moment.
          </div>
        ) : (
          pendingBookings.map(booking => {
            const shipment = shipments.find(s => s.id === booking.shipmentId);
            if (!shipment) return null;
            
            return (
              <div key={booking.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-light rounded-xl text-brand-blue"><Box size={24}/></div>
                  <div>
                    <p className="font-bold text-brand-navy text-lg">{shipment.id} - {shipment.origin} to {shipment.dest}</p>
                    <p className="text-sm text-slate-500">{shipment.cargo} ({shipment.weight} kg) - Pickup: {shipment.date}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  <button onClick={() => updateBookingStatus(booking.id, "Rejected")} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 transition">
                    <X size={18}/> Decline
                  </button>
                  <button onClick={() => updateBookingStatus(booking.id, "Confirmed")} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-navy text-white font-semibold hover:bg-slate-800 transition">
                    <Check size={18}/> Accept
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
