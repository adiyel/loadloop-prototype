"use client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { Users, Truck, CircleDollarSign } from "lucide-react";

const revenueData = [
  { name: 'Week 1', revenue: 15000 }, { name: 'Week 2', revenue: 22000 },
  { name: 'Week 3', revenue: 18000 }, { name: 'Week 4', revenue: 35000 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Platform Reports & Analytics</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div><p className="text-sm font-semibold text-slate-500">Platform Revenue</p><p className="text-3xl font-bold mt-2 text-brand-navy">₱90,000</p></div>
          <div className="p-3 bg-brand-light text-brand-blue rounded-xl"><CircleDollarSign size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div><p className="text-sm font-semibold text-slate-500">Total Matches</p><p className="text-3xl font-bold mt-2 text-brand-navy">142</p></div>
          <div className="p-3 bg-brand-light text-brand-blue rounded-xl"><Truck size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div><p className="text-sm font-semibold text-slate-500">Active Users</p><p className="text-3xl font-bold mt-2 text-brand-navy">1,204</p></div>
          <div className="p-3 bg-brand-light text-brand-blue rounded-xl"><Users size={24} /></div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-lg text-brand-navy mb-6">Revenue Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#0077FF" strokeWidth={4} dot={{r: 6, fill: '#0077FF'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-lg text-brand-navy mb-4">Complaints & Disputes</h2>
          <div className="space-y-3">
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
              <p className="font-bold text-rose-700 text-sm">Delayed Delivery - SHP-1001</p>
              <p className="text-xs text-rose-600 mt-1">MSME reported 2-hour delay at Batangas hub.</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-bold text-amber-700 text-sm">Capacity Dispute - TRK-02</p>
              <p className="text-xs text-amber-600 mt-1">Operator claims weight exceeds declared limit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
