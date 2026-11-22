"use client";
import { useApp } from "@/context/AppContext";

export default function AdminBookings() {
  const { bookings, shipments } = useApp();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Transaction Management</h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Booking ID</th>
              <th className="px-6 py-4 font-medium">MSME</th>
              <th className="px-6 py-4 font-medium">Route</th>
              <th className="px-6 py-4 font-medium">Total Paid</th>
              <th className="px-6 py-4 font-medium">Platform Fee</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map(b => {
              const ship = shipments.find(s => s.id === b.shipmentId);
              return (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-brand-navy">{b.id}</td>
                  <td className="px-6 py-4">{ship?.msmeName || "Unknown"}</td>
                  <td className="px-6 py-4 text-slate-500">{ship?.origin} to {ship?.dest}</td>
                  <td className="px-6 py-4 font-semibold">₱{b.totalCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">₱{b.platformFee.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      b.status === "Delivered" ? "bg-green-100 text-green-700" :
                      b.status === "Cancelled" || b.status === "Rejected" ? "bg-rose-100 text-rose-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>{b.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
