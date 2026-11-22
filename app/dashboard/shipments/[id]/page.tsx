"use client";
import { useApp } from "@/context/AppContext";
import { notFound, useParams, useRouter } from "next/navigation";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export default function ShipmentDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { shipments, bookings, cancelBooking } = useApp();
  const shipment = shipments.find(s => s.id === id);
  const booking = bookings.find(b => b.shipmentId === id);

  if (!shipment) return notFound();

  const handleCancel = () => {
    if (booking && confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(booking.id);
      router.push("/dashboard/shipments");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">{shipment.id}</h1>
          <p className="text-slate-500">{shipment.origin} to {shipment.dest}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-4 py-2 font-bold rounded-lg ${
            shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' :
            shipment.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
            'bg-blue-100 text-brand-blue'
          }`}>{shipment.status}</span>
          
          {booking && ["Pending", "Matched", "Confirmed"].includes(booking.status) && (
            <button onClick={handleCancel} className="text-sm font-semibold text-rose-500 hover:underline">Cancel Booking</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-lg mb-4 text-brand-navy">Shipment Info</h2>
          <div className="space-y-3 text-sm">
            <p><span className="text-slate-500">Operator:</span> {booking?.operator || "Searching..."}</p>
            <p><span className="text-slate-500">Cargo:</span> {shipment.cargo}</p>
            <p><span className="text-slate-500">Weight:</span> {shipment.weight} kg</p>
            {booking && <p><span className="text-slate-500">Total Cost:</span> ₱{booking.cost.toLocaleString()}</p>}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-lg mb-4 text-brand-navy">Tracking Timeline</h2>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-slate-100">
            {shipment.timeline.map((event, i) => (
              <div key={i} className="relative flex gap-4 items-start">
                <div className="mt-1 bg-white z-10 shrink-0">
                  {event.status.includes("Cancelled") ? <XCircle className="text-rose-500" size={18}/> : 
                   event.status.includes("Delivered") ? <CheckCircle2 className="text-green-500" size={18}/> : 
                   <Clock className="text-brand-blue" size={18}/>}
                </div>
                <div>
                  <p className="font-semibold text-brand-navy text-sm">{event.status}</p>
                  <p className="text-xs text-slate-400">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
