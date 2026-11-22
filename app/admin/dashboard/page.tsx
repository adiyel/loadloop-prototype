import Link from "next/link";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { shipments, users } from "@/lib/data";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Overview</h1>
      <p className="text-slate-500">Platform-wide metrics and activity.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={String(users.length)} hint="MSMEs + operators" />
        <StatCard label="Active Shipments" value="3" hint="in transit / matched" />
        <StatCard label="Trucks Utilized" value="2 / 5" hint="today" />
        <StatCard label="Est. Cost Saved" value="₱24,300" hint="platform-wide (month)" />
      </div>

      <h2 className="mt-10 text-lg font-semibold">Recent Shipments</h2>
      <div className="mt-3 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Truck</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.slice(0, 4).map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{s.id}</td>
                <td className="px-4 py-3">{s.route}</td>
                <td className="px-4 py-3 text-slate-600">{s.truck}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3 text-right">
                  <Link href="/admin/shipments" className="text-brand hover:underline">Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
