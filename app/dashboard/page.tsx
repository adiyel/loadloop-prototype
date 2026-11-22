"use client";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { ArrowUpRight, Package, Truck, Wallet } from "lucide-react";

export default function MSMEDashboard() {
  const { shipments } = useApp();
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Active Shipments" value={shipments.filter(s => s.status !== 'Delivered').length.toString()} icon={Package} />
        <StatCard title="Total Cost Saved" value="₱8,450" icon={Truck} />
        <StatCard title="Available Balance" value="₱12,000" icon={Wallet} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-brand-navy">Recent Shipments</h2>
          <Link href="/dashboard/shipments" className="text-sm text-brand-blue font-semibold hover:underline">View All</Link>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Route</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.slice(0, 3).map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-brand-navy">{s.id}</td>
                <td className="px-6 py-4">{s.origin} to {s.dest}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    s.status === "Delivered" ? "bg-green-100 text-green-700" :
                    s.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>{s.status}</span>
                </td>
                <td className="px-6 py-4 font-semibold">{s.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }: any) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex justify-between items-center">
      <div>
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <p className="text-3xl font-bold mt-2 text-brand-navy">{value}</p>
      </div>
      <div className="p-3 rounded-xl bg-brand-light text-brand-blue"><Icon size={24} /></div>
    </div>
  );
}
