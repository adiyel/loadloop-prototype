"use client";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Truck, Package, CircleDollarSign, ShieldAlert } from "lucide-react";
import Link from "next/link";

const chartData = [
  { name: 'Mon', shipments: 120 }, { name: 'Tue', shipments: 180 },
  { name: 'Wed', shipments: 150 }, { name: 'Thu', shipments: 240 },
  { name: 'Fri', shipments: 320 }, { name: 'Sat', shipments: 280 },
  { name: 'Sun', shipments: 210 },
];

const recentShipments = [
  { id: "TRK-8819", route: "Manila - Batangas", carrier: "NorthStar", status: "In Transit", eta: "Jun 4, 2:00 PM", cost: "₱3,200" },
  { id: "TRK-8821", route: "Cebu - Mandaue", carrier: "MetroHaul", status: "At Risk", eta: "Jun 3, 4:00 PM", cost: "₱1,800" },
  { id: "TRK-8817", route: "Davao - Tagum", carrier: "Apex Freight", status: "Delivered", eta: "Jun 2, 10:00 AM", cost: "₱2,100" },
  { id: "TRK-8820", route: "Manila - Laguna", carrier: "SwiftHaul", status: "On Track", eta: "Jun 4, 9:00 AM", cost: "₱950" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Shipments" value="3,658" change="+18.2%" trend="up" icon={Package} />
        <StatCard title="Active Trucks" value="124" change="+12.4%" trend="up" icon={Truck} />
        <StatCard title="Cost Saved" value="₱24,500" change="-8.1%" trend="down" icon={CircleDollarSign} />
        <StatCard title="Delayed / At Risk" value="122" change="+3.2%" trend="up" icon={ShieldAlert} alert />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-brand-navy">Shipment Activity</h2>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorShip" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0077FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0077FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <Tooltip cursor={{stroke: '#e2e8f0', strokeWidth: 2}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="shipments" stroke="#0077FF" strokeWidth={3} fillOpacity={1} fill="url(#colorShip)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h2 className="font-bold text-lg text-brand-navy mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/loadboard" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-brand-light hover:border-brand-blue transition group">
              <div>
                <p className="font-semibold text-brand-navy group-hover:text-brand-blue">Create New Shipment</p>
                <p className="text-xs text-slate-500">Start tracking a new load</p>
              </div>
              <ArrowUpRight className="text-slate-400 group-hover:text-brand-blue" />
            </Link>
            <Link href="/tracking" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-brand-light hover:border-brand-blue transition group">
              <div>
                <p className="font-semibold text-brand-navy group-hover:text-brand-blue">Live Tracking</p>
                <p className="text-xs text-slate-500">Monitor active trucks</p>
              </div>
              <ArrowUpRight className="text-slate-400 group-hover:text-brand-blue" />
            </Link>
            <button className="w-full mt-4 py-3 rounded-xl bg-brand-orange text-white font-bold hover:bg-orange-600 transition">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-brand-navy">Recent Shipments</h2>
          <Link href="/loadboard" className="text-sm text-brand-blue font-semibold hover:underline">View All</Link>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Tracking ID</th>
              <th className="px-6 py-4 font-medium">Route</th>
              <th className="px-6 py-4 font-medium">Carrier</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">ETA</th>
              <th className="px-6 py-4 font-medium">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentShipments.map((s, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-brand-navy">{s.id}</td>
                <td className="px-6 py-4">{s.route}</td>
                <td className="px-6 py-4 text-slate-500">{s.carrier}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    s.status === "Delivered" ? "bg-green-100 text-green-700" :
                    s.status === "At Risk" ? "bg-red-100 text-red-700" :
                    s.status === "On Track" ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{s.eta}</td>
                <td className="px-6 py-4 font-semibold">{s.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon, alert }: any) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${alert ? "text-red-500" : "text-brand-navy"}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${alert ? "bg-red-50 text-red-500" : "bg-brand-light text-brand-blue"}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
        <span className={`flex items-center gap-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
          {trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {change}
        </span>
        <span className="text-slate-400 font-normal">vs last month</span>
      </div>
    </div>
  );
}
