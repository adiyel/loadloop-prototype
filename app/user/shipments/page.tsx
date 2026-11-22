import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { shipments } from "@/lib/data";

export default function MyShipments() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Shipments</h1>
          <p className="text-slate-500">All your bookings and their status.</p>
        </div>
        <Link href="/user/book" className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + New Shipment
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Cargo</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{s.id}</td>
                <td className="px-4 py-3">{s.route}</td>
                <td className="px-4 py-3 text-slate-600">{s.cargo}</td>
                <td className="px-4 py-3">{s.date}</td>
                <td className="px-4 py-3">{s.cost}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/user/shipments/${s.id}`} className="text-brand hover:underline">Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
