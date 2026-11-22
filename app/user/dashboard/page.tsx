import Link from "next/link";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { shipments } from "@/lib/data";

export default function UserDashboard() {
  const active = shipments.filter((s) => s.status === "Matched" || s.status === "In Transit");
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Aling Nena's Bakery 👋</h1>
          <p className="text-slate-500">Here's what's moving today.</p>
        </div>
        <Link href="/user/book" className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Book Shipment
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Shipments" value={String(active.length)} hint="Matched or in transit" />
        <StatCard label="Cost Saved (this month)" value="₱8,450" hint="via shared trucks" />
        <StatCard label="Total Shipments" value="12" hint="all time" />
        <StatCard label="CO₂ Saved" value="42 kg" hint="estimated" />
      </div>

      <h2 className="mt-10 text-lg font-semibold">Recent Shipments</h2>
      <div className="mt-3 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.slice(0, 4).map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{s.id}</td>
                <td className="px-4 py-3">{s.route}</td>
                <td className="px-4 py-3">{s.date}</td>
                <td className="px-4 py-3">{s.cost}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/user/shipments/${s.id}`} className="text-brand hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
