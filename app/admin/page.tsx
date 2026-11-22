"use client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Truck, CircleDollarSign, Activity, ShieldAlert } from "lucide-react";

const utilizationData = [
  { name: 'Truck 01', utilization: 85 }, { name: 'Truck 02', utilization: 45 },
  { name: 'Truck 03', utilization: 92 }, { name: 'Truck 04', utilization: 60 },
  { name: 'Truck 05', utilization: 100 }, { name: 'Truck 06', utilization: 30 },
];

const adminUsers = [
  { id: "U-201", name: "Aling Nena's Bakery", role: "MSME", status: "Active", shipments: 12 },
  { id: "U-203", name: "Northstar Trucking", role: "Operator", status: "Active", shipments: 47 },
  { id: "U-204", name: "GreenLeaf Organics", role: "MSME", status: "Pending", shipments: 0 },
  { id: "U-205", name: "MetroHaul Logistics", role: "Operator", status: "Active", shipments: 33 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Platform Administration</h1>
          <p className="text-slate-500">Manage users, fleet utilization, and system health.</p>
        </div>
        <button className="bg-brand-orange text-white px-5 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition shadow-sm">
          + Add New Operator
        </button>
      </div>

      {/* Admin KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="1,248" icon={Users} />
        <StatCard title="Active Trucks" value="142" icon={Truck} />
        <StatCard title="Platform Revenue" value="₱1.2M" icon={CircleDollarSign} />
        <StatCard title="System Alerts" value="3" icon={ShieldAlert} alert />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Truck Utilization Chart */}
        <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-brand-navy">Fleet Utilization</h2>
            <p className="text-sm text-slate-500">Average 68% capacity used</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData} barSize={40}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="utilization" radius={[4, 4, 0, 0]}>
                  {utilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.utilization > 80 ? '#0077FF' : entry.utilization > 50 ? '#FF6B00' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health Panel */}
        <div className="rounded-2xl bg-brand-navy p-6 shadow-sm border border-slate-800 text-white flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2"><Activity size={20} className="text-brand-orange"/> System Health</h2>
            <p className="text-sm text-slate-400 mb-6">All services are running normally.</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Matching Engine</span> <span className="text-green-400">Operational</span></div>
              <div className="w-full bg-slate-700 h-2 rounded-full"><div className="bg-green-400 h-2 rounded-full w-full"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>GPS Tracking API</span> <span className="text-green-400">Operational</span></div>
              <div className="w-full bg-slate-700 h-2 rounded-full"><div className="bg-green-400 h-2 rounded-full w-[98%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Payment Gateway</span> <span className="text-yellow-400">Degraded</span></div>
              <div className="w-full bg-slate-700 h-2 rounded-full"><div className="bg-yellow-400 h-2 rounded-full w-[75%]"></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-brand-navy">Recent User Registrations</h2>
          <button className="text-sm text-brand-blue font-semibold hover:underline">View All Users</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">User ID</th>
              <th className="px-6 py-4 font-medium">Company Name</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Shipments</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {adminUsers.map((u, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-brand-navy">{u.id}</td>
                <td className="px-6 py-4 font-medium">{u.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    u.role === "Operator" ? "bg-indigo-100 text-indigo-700" : "bg-teal-100 text-teal-700"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{u.shipments}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    u.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="border border-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-slate-100 transition">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, alert }: any) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${alert ? "text-brand-orange" : "text-brand-navy"}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${alert ? "bg-orange-50 text-brand-orange" : "bg-brand-light text-brand-blue"}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
