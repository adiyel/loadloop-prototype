"use client";
import { useApp } from "@/context/AppContext";
import Link from "next/link";

export default function MyShipments() {
  const { shipments } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-navy">My Shipments</h1>
        <Link href="/dashboard/create" className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition">
          + New Shipment
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Route</th>
              <th className="px-6 py-4 font-medium">Operator</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Cost</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-brand-navy">{s.id}</td>
                <td className="px-6 py-4">{s.origin} to {s.dest}</td>
                <td className="px-6 py-4 text-slate-500">{s.operator}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    s.status === "Delivered" ? "bg-green-100 text-green-700" :
                    s.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>{s.status}</span>
                </td>
                <td className="px-6 py-4 font-semibold">{s.cost}</td>
                <td className="px-6 py-4">
                  <Link href={`/dashboard/shipments/${s.id}`} className="text-brand-blue font-semibold hover:underline">Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
