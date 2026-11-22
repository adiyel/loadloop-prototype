"use client";
import { Truck, CheckCircle2, Phone, MessageSquare } from "lucide-react";

const milestones = [
  { status: "completed", title: "Picked Up", time: "Jun 1 - 08:14 AM", desc: "Taguig City Hub" },
  { status: "completed", title: "Departed Hub", time: "Jun 1 - 10:32 AM", desc: "NLEX Toll Gate" },
  { status: "current", title: "In Transit", time: "Now", desc: "Near San Fernando, Pampanga" },
  { status: "upcoming", title: "Out for Delivery", time: "Est. Jun 4 - 4:00 AM", desc: "Batangas City" },
  { status: "upcoming", title: "Delivered", time: "Est. Jun 4 - 2:00 PM", desc: "Aling Nena's Bakery" },
];

export default function Tracking() {
  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Live Tracking</h1>
          <p className="text-slate-500">Tracking ID: <span className="font-bold text-brand-navy">TRK-8819</span></p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white font-medium hover:bg-slate-50 transition">
            <Phone size={18} /> Call Carrier
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg font-medium hover:bg-slate-800 transition">
            <MessageSquare size={18} /> Live Chat
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="flex-[2] bg-slate-200 rounded-2xl relative overflow-hidden shadow-inner border border-slate-300">
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-brand-light"></div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 100 400 Q 300 200 500 300 T 800 100" fill="none" stroke="#0077FF" strokeWidth="4" strokeDasharray="8 8" />
          </svg>
          
          <div className="absolute left-[100px] bottom-[100px] flex flex-col items-center">
            <div className="bg-white px-2 py-1 rounded text-xs font-bold shadow mb-1">Taguig City</div>
            <div className="h-4 w-4 bg-brand-blue rounded-full border-2 border-white shadow"></div>
          </div>

          <div className="absolute left-[500px] top-[300px] flex flex-col items-center animate-pulse">
            <div className="bg-brand-navy text-white px-2 py-1 rounded text-xs font-bold shadow mb-1">TRK-8819</div>
            <div className="h-10 w-10 bg-brand-orange rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <Truck size={20} className="text-white" />
            </div>
          </div>

          <div className="absolute right-[200px] top-[100px] flex flex-col items-center">
            <div className="bg-white px-2 py-1 rounded text-xs font-bold shadow mb-1">Batangas City</div>
            <div className="h-4 w-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col overflow-y-auto">
          <h2 className="font-bold text-lg text-brand-navy mb-6">Shipment Details</h2>
          
          <div className="mb-6 grid grid-cols-2 gap-4">
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Truck</p>
               <p className="font-semibold text-brand-navy">Isuzu Elf (Closed Van)</p>
             </div>
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Driver</p>
               <p className="font-semibold text-brand-navy">Juan Dela Cruz</p>
             </div>
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Cargo</p>
               <p className="font-semibold text-brand-navy">Furniture (4 boxes)</p>
             </div>
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Weight</p>
               <p className="font-semibold text-brand-navy">180 kg</p>
             </div>
          </div>

          <h3 className="font-bold text-brand-navy mb-4">Milestone Tracker</h3>
          <div className="space-y-0 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-blue before:via-slate-200 before:to-slate-200">
            {milestones.map((m, i) => (
              <div key={i} className="relative flex items-start gap-4 pb-6 last:pb-0">
                <div className={`mt-1 h-7 w-7 rounded-full flex items-center justify-center border-4 border-white shadow z-10 shrink-0 ${
                  m.status === 'completed' ? 'bg-brand-blue' : 
                  m.status === 'current' ? 'bg-brand-orange animate-pulse' : 
                  'bg-slate-200'
                }`}>
                  {m.status === 'completed' && <CheckCircle2 size={14} className="text-white" />}
                  {m.status === 'current' && <Truck size={14} className="text-white" />}
                </div>
                <div>
                  <p className={`font-bold ${m.status === 'upcoming' ? 'text-slate-400' : 'text-brand-navy'}`}>{m.title}</p>
                  <p className="text-xs text-slate-500">{m.time}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
