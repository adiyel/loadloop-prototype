"use client";
import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { shipments } from "@/lib/data";

export default function AdminShipments() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Pending", "Matched", "In Transit", "Delivered"];
  const visible = filter === "All" ? shipments : shipments.filter((s) => s.status === filter);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Shipment Management</h1>
      <p className="text-slate-500">Review, match, and monitor all shipments.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              filter === f ? "bg-brand text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Truck</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{s.id}</td>
                <td className="px-4 py-3">{s.route}</td>
                <td className="px-4 py-3 text-slate-600">{s.truck}</td>
                <td className="px-4 py-3">{s.cost}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3 text-right">
                  {s.status === "Pending" ? (
                    <button className="rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-dark">
                      Match Truck
                    </button>
                  ) : (
                    <button className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-50">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
