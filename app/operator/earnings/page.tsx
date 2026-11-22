"use client";
import { useApp } from "@/context/AppContext";

export default function OperatorEarnings() {
  const { bookings } = useApp();
  const completed = bookings.filter(b => ["Delivered", "Confirmed"].includes(b.status));

  const totalRevenue = completed.reduce((sum, b) => sum + b.totalCost, 0);
  const platformFees = completed.reduce((sum, b) => sum + b.platformFee, 0);
  const netEarnings = completed.reduce((sum, b) => sum + b.operatorPayout, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Earnings & Payouts</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-500">Gross Revenue</p>
          <p className="text-3xl font-bold mt-2 text-brand-navy">₱{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-500">Platform Fees (5%)</p>
          <p className="text-3xl font-bold mt-2 text-rose-500">-₱{platformFees.toLocaleString()}</p>
        </div>
        <div className="bg-brand-navy p-6 rounded-2xl border border-slate-800">
          <p className="text-sm font-semibold text-slate-400">Net Payout</p>
          <p className="text-3xl font-bold mt-2 text-white">₱{netEarnings.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Booking ID</th>
              <th className="px-6 py-4 font-medium">Total MSME Paid</th>
              <th className="px-6 py-4 font-medium">Platform Fee</th>
              <th className="px-6 py-4 font-medium">Your Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {completed.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-brand-navy">{b.id}</td>
                <td className="px-6 py-4">₱{b.totalCost.toLocaleString()}</td>
                <td className="px-6 py-4 text-rose-500">-₱{b.platformFee.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-green-600">₱{b.operatorPayout.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
