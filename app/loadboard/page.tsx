"use client";
import { useState } from "react";
import { Search, Filter, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

const loads = [
  { id: 1, origin: "Manila, NCR", dest: "Batangas City", price: "₱3,200", weight: "180 kg", type: "Closed Van", match: "98%", date: "Nov 28" },
  { id: 2, origin: "Cebu City", dest: "Mandaue City", price: "₱950", weight: "45 kg", type: "L300", match: "94%", date: "Nov 27" },
  { id: 3, origin: "Davao City", dest: "Tagum City", price: "₱2,100", weight: "320 kg", type: "Truck", match: "91%", date: "Nov 26" },
  { id: 4, origin: "Quezon City", dest: "San Fernando, Pampanga", price: "₱2,450", weight: "260 kg", type: "Closed Van", match: "88%", date: "Nov 29" },
  { id: 5, origin: "Pasig City", dest: "Calamba, Laguna", price: "₱1,800", weight: "90 kg", type: "Shared", match: "85%", date: "Nov 28" },
  { id: 6, origin: "Taguig City", dest: "Baguio City", price: "₱4,500", weight: "150 kg", type: "Shared", match: "75%", date: "Nov 30" },
];

export default function LoadBoard() {
  const [filter, setFilter] = useState("All Loads");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Load Board</h1>
          <p className="text-slate-500">Find and book available truck space.</p>
        </div>
        <button className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition">
          + Post a Load
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input type="text" placeholder="Search by city, state, or equipment..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-lg border-transparent focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue outline-none transition" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="flex gap-2">
        {["All Loads", "Dry Van", "Reefer", "Flatbed", "Shared"].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === f ? "bg-brand-navy text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loads.map((load) => (
          <div key={load.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 font-bold text-lg text-brand-navy">
                    {load.origin} <ArrowRight size={16} className="text-slate-400" /> {load.dest}
                  </div>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Calendar size={14}/> Est. Pickup: {load.date}</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                  {load.match} match
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 my-4">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Price</p>
                  <p className="font-bold text-brand-navy">{load.price}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Weight</p>
                  <p className="font-bold text-brand-navy">{load.weight}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Type</p>
                  <p className="font-bold text-brand-navy">{load.type}</p>
                </div>
              </div>
            </div>
            
            <Link href="/tracking" className="block w-full text-center py-2.5 rounded-lg border-2 border-slate-100 font-semibold text-brand-navy group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
