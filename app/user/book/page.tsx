"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookShipment() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="p-8">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-100 text-2xl">✓</div>
          <h1 className="mt-4 text-xl font-bold">Booking Received</h1>
          <p className="mt-2 text-sm text-slate-500">
            Reference <span className="font-mono font-semibold">LL-1043</span>. We'll match your shipment with a compatible truck within a few hours.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => router.push("/user/shipments")} className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
              View Shipments
            </button>
            <button onClick={() => setSubmitted(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Book a Shipment</h1>
      <p className="text-slate-500">Tell us what you're sending and where.</p>

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="mt-6 max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Pickup City" defaultValue="Taguig City" />
          <Field label="Dropoff City" defaultValue="Batangas City" />
          <Field label="Pickup Date" type="date" defaultValue="2025-11-28" />
          <Field label="Cargo Description" defaultValue="Furniture (4 boxes)" />
          <Field label="Weight (kg)" defaultValue="180" />
          <Field label="Preferred Truck Type" defaultValue="Closed van (shared)" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Notes (optional)</label>
          <textarea className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand focus:outline-none" rows={3} placeholder="Fragile, handle with care" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-lg bg-brand px-5 py-2 text-sm font-medium text-white hover:bg-brand-dark">
            Submit Booking
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium hover:bg-slate-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, type = "text", defaultValue }: { label: string; type?: string; defaultValue?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input type={type} defaultValue={defaultValue} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-brand focus:outline-none" />
    </div>
  );
}
