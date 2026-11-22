"use client";
import { useApp } from "@/context/AppContext";
import { notFound, useParams, useRouter } from "next/navigation";
import { CheckCircle2, Clock, XCircle, Star } from "lucide-react";
import { useState } from "react";

export default function ShipmentDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { shipments, bookings, cancelBooking } = useApp();
  const shipment = shipments.find(s => s.id === id);
  const booking = bookings.find(b => b.shipmentId === id);
  const [rating, setRating] = useState(0);

  if (!shipment) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ... (existing header and info cards) ... */}

      {shipment.status === "Delivered" && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-lg mb-2 text-brand-navy">Rate Your Experience</h2>
          <p className="text-sm text-slate-500 mb-4">How was your delivery with {booking?.operator}?</p>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setRating(star)}>
                <Star size={32} className={star <= rating ? "fill-brand-orange text-brand-orange" : "text-slate-300"} />
              </button>
            ))}
          </div>
          {rating > 0 && <button className="mt-4 bg-brand-navy text-white px-6 py-2 rounded-lg font-semibold">Submit Review</button>}
        </div>
      )}
    </div>
  );
}
