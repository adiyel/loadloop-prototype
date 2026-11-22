import Link from "next/link";
import { Truck, Package, Users } from "lucide-react";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white text-xl font-bold">LL</div>
          <h1 className="text-2xl font-bold">LoadLoop</h1>
        </div>
        <h2 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Share truck space.<br />
          <span className="text-brand">Cut delivery costs.</span>
        </h2>
        <p className="mt-4 max-w-xl text-slate-600">
          LoadLoop matches MSMEs shipping along compatible routes so they can share one truck — saving cost and using capacity that would otherwise go empty.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link href="/user/dashboard" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <Package className="text-brand" />
            <p className="mt-4 text-lg font-semibold">MSME / Shipper Portal</p>
            <p className="mt-1 text-sm text-slate-500">Book shipments, track matches, view savings.</p>
            <p className="mt-4 text-sm font-medium text-brand group-hover:underline">Enter as Shipper →</p>
          </Link>
          <Link href="/admin/dashboard" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <Users className="text-brand" />
            <p className="mt-4 text-lg font-semibold">Admin Portal</p>
            <p className="mt-1 text-sm text-slate-500">Oversee shipments, matches, and operators.</p>
            <p className="mt-4 text-sm font-medium text-brand group-hover:underline">Enter as Admin →</p>
          </Link>
        </div>

        <p className="mt-10 text-xs text-slate-400">Prototype • Sample data only</p>
      </div>
    </main>
  );
}
