"use client";
import { useApp } from "@/context/AppContext";
import { Download, CheckCircle2, Clock } from "lucide-react";

export default function Billing() {
  const { bookings } = useApp();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Payment History</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Transaction ID</th>
              <th className="px-6 py-4 font-medium">Shipment</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-brand-navy">{b.id}</td>
                <td className="px-6 py-4">{b.shipmentId}</td>
                <td className="px-6 py-4 font-semibold">₱{b.cost.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${b.status === 'Confirmed' ? 'text-green-600' : 'text-amber-600'}`}>
                    {b.status === 'Confirmed' ? <CheckCircle2 size={14}/> : <Clock size={14}/>} {b.status === 'Confirmed' ? 'Paid' : 'Pending Payment'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1 text-brand-blue font-semibold hover:underline"><Download size={14}/> Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
