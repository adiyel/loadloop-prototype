"use client";
export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-brand-navy mb-6">Business Profile</h1>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Company Name</label>
            <input type="text" defaultValue="Aling Nena's Bakery" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Contact Email</label>
            <input type="email" defaultValue="orders@nena.ph" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Business Address</label>
          <input type="text" defaultValue="123 Main St, Taguig City" className="w-full p-2.5 border rounded-lg bg-slate-50 focus:bg-white" />
        </div>
        <div className="pt-4 border-t border-slate-100">
          <button className="bg-brand-navy text-white px-6 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
