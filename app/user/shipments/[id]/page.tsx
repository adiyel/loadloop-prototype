import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { shipments } from "@/lib/data";

export default function ShipmentDetail({ params }: { params: { id: string } }) {
  const s = shipments.find((x) => x.id === params.id);
  if (!s) return notFound();

  return (
    <div className="p-8">
      <Link href="/user/shipments" className="text-sm text-brand hover:underline">← Back to shipments</Link>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{s.id}</h1>
          <p className="text-slate-500">{s.route}</p>
        </div>
        <StatusBadge status={s.status} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <InfoCard title="Pickup" value={s.pickup} />
        <InfoCard title="Dropoff" value={s.dropoff} />
        <InfoCard title="Scheduled Date" value={s.date} />
        <InfoCard title="Cargo" value={s.cargo} />
        <InfoCard title="Weight" value={s.weight} />
        <InfoCard title="Cost" value={s.cost} />
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="font-semibold">Assigned Truck</h2>
        <p className="mt-2 text-slate-700">{s.truck}</p>
        <div className="mt-4 flex gap-3">
          <button className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">Contact Operator</button>
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">Track Shipment</button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
