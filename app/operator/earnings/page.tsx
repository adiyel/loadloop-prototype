"use client";
import { useApp } from "@/context/AppContext";
import { CircleDollarSign, Wallet } from "lucide-react";

export default function OperatorEarnings() {
  const { bookings } = useApp();
  const completedBookings = bookings.filter(b => b.status === "Delivered" || b.status === "Confirmed"); // For demo, showing confirmed + delivered as earnings

  const totalRevenue = completedBookings.reduce((sum, b) => sum + b.cost, 0);
  const platformFees = completedBookings.reduce((sum, b) => sum + b.platformFee, 0);
  const netEarnings = totalRevenue - platformFees;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Earnings & Payouts</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-semibold text-slate-500">Gross Revenue</p>
          <p className="text-3xl font-bold mt-2 text-brand-navy">₱{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-semibold text-slate-500">Platform Fees (5%)</p>
          <p className="text-3xl font-bold mt-2 text-rose-500">-₱{platformFees.toLocaleString()}</p>
        </div>
        <div className="bg-brand-navy p-6 rounded-2xl shadow-sm border border-slate-800">
          <p className="text-sm font-semibold text-slate-400">Net Earnings</p>
          <p className="text-3xl font-bold mt-2 text-white">₱{netEarnings.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Booking ID</th>
              <th className="px-6 py-4 font-medium">Shipment</th>
              <th className="px-6 py-4 font-medium">Gross Amount</th>
              <th className="px-6 py-4 font-medium">Platform Fee</th>
              <th className="px-6 py-4 font-medium">Your Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {completedBookings.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-brand-navy">{b.id}</td>
                <td className="px-6 py-4">{b.shipmentId}</td>
                <td className="px-6 py-4">₱{b.cost.toLocaleString()}</td>
                <td className="px-6 py-4 text-rose-500">-₱{b.platformFee.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-green-600">₱{(b.cost - b.platformFee).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
