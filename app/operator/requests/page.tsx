"use client";
import { useApp } from "@/context/AppContext";
import { Check, X, Truck, PackageCheck, Box } from "lucide-react";

export default function ShipmentRequests() {
  const { bookings, shipments, updateBookingStatus } = useApp();
  
  const activeBookings = bookings.filter(b => ["Pending", "Confirmed", "In Transit", "Picked Up"].includes(b.status));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Shipment Management</h1>
      <p className="text-slate-500">Accept requests and update delivery statuses.</p>

      <div className="space-y-4">
        {activeBookings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">No active bookings.</div>
        ) : (
          activeBookings.map(booking => {
            const shipment = shipments.find(s => s.id === booking.shipmentId);
            if (!shipment) return null;
            
            return (
              <div key={booking.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-light rounded-xl text-brand-blue"><Box size={24}/></div>
                  <div>
                    <p className="font-bold text-brand-navy text-lg">{shipment.id} - {shipment.origin} to {shipment.dest}</p>
                    <p className="text-sm text-slate-500">{shipment.cargo} ({shipment.weight} kg) - Status: <span className="font-bold text-brand-orange">{booking.status}</span></p>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  {booking.status === "Pending" && (
                    <>
                      <button onClick={() => updateBookingStatus(booking.id, "Rejected")} className="px-4 py-2 rounded-lg border border-rose-200 text-rose-600 font-semibold hover:bg-rose-50"><X size={18}/> Decline</button>
                      <button onClick={() => updateBookingStatus(booking.id, "Confirmed")} className="px-4 py-2 rounded-lg bg-brand-navy text-white font-semibold hover:bg-slate-800"><Check size={18}/> Accept</button>
                    </>
                  )}
                  {booking.status === "Confirmed" && (
                    <button onClick={() => updateBookingStatus(booking.id, "In Transit")} className="px-4 py-2 rounded-lg bg-brand-blue text-white font-semibold hover:bg-blue-600 flex items-center gap-2"><Truck size={18}/> Mark In Transit</button>
                  )}
                  {booking.status === "In Transit" && (
                    <button onClick={() => updateBookingStatus(booking.id, "Delivered")} className="px-4 py-2 rounded-lg bg-brand-success text-white font-semibold hover:bg-green-600 flex items-center gap-2"><PackageCheck size={18}/> Mark Delivered</button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
