"use client";
import { useApp } from "@/context/AppContext";
import { notFound, useParams } from "next/navigation";
import { Truck, CheckCircle2, MapPin } from "lucide-react";

export default function ShipmentDetails() {
  const { id } = useParams();
  const { shipments } = useApp();
  const shipment = shipments.find(s => s.id === id);

  if (!shipment) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">{shipment.id}</h1>
          <p className="text-slate-500">{shipment.origin} to {shipment.dest}</p>
        </div>
        <span className="px-4 py-2 bg-blue-100 text-brand-blue font-bold rounded-lg">{shipment.status}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-lg mb-4 text-brand-navy">Shipment Info</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-slate-500">Operator:</span> {shipment.operator}</p>
            <p><span className="text-slate-500">Cargo:</span> {shipment.cargo}</p>
            <p><span className="text-slate-500">Weight:</span> {shipment.weight}</p>
            <p><span className="text-slate-500">Est. Cost:</span> {shipment.cost}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-lg mb-4 text-brand-navy">Tracking Timeline</h2>
          <div className="space-y-4">
             <div className="flex gap-3"><CheckCircle2 className="text-brand-blue shrink-0" size={20}/> <div><p className="font-semibold">Booking Confirmed</p></div></div>
             <div className="flex gap-3"><Truck className={shipment.status !== "Pending" ? "text-brand-blue" : "text-slate-300"} size={20}/> <div><p className={shipment.status !== "Pending" ? "font-semibold" : "text-slate-400"}>In Transit</p></div></div>
             <div className="flex gap-3"><MapPin className={shipment.status === "Delivered" ? "text-brand-blue" : "text-slate-300"} size={20}/> <div><p className={shipment.status === "Delivered" ? "font-semibold" : "text-slate-400"}>Delivered</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
