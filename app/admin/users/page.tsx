"use client";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

const users = [
  { id: "U-201", name: "Aling Nena's Bakery", role: "MSME", status: "Active", email: "orders@nena.ph" },
  { id: "U-202", name: "TechHub Gadgets", role: "MSME", status: "Active", email: "ship@techhub.ph" },
  { id: "U-203", name: "Northstar Trucking", role: "Operator", status: "Active", email: "ops@northstar.ph" },
  { id: "U-204", name: "GreenLeaf Organics", role: "MSME", status: "Suspended", email: "logistics@greenleaf.ph" },
];

export default function UserManagement() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">User Management</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">User ID</th>
              <th className="px-6 py-4 font-medium">Company</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-brand-navy">{u.id}</td>
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'Operator' ? 'bg-indigo-100 text-indigo-700' : 'bg-teal-100 text-teal-700'}`}>{u.role}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1 text-xs font-bold ${u.status === 'Active' ? 'text-green-600' : 'text-rose-600'}`}>
                    {u.status === 'Active' ? <CheckCircle2 size={14}/> : <ShieldAlert size={14}/>} {u.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-brand-blue font-semibold hover:underline">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
