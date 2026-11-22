import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, Store, Package } from "lucide-react";

export default function Solutions() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-slate-200">
        <Logo className="h-10" />
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-navy transition">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>
      <main className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-brand-navy mb-4">Solutions for Every Need</h1>
        <p className="text-lg text-slate-600 mb-12">Whether you are shipping or driving, LoadLoop saves you money.</p>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-brand-orange">
            <Store className="text-brand-orange mb-4" size={40} />
            <h3 className="font-bold text-2xl mb-2 text-brand-navy">For MSMEs</h3>
            <p className="text-slate-500 mb-6">Stop paying for a whole truck when you only need a fraction of it. Share space, save up to 40% on logistics, and track every item.</p>
            <Link href="/dashboard/create" className="bg-brand-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition">Create a Shipment</Link>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-brand-blue">
            <Package className="text-brand-blue mb-4" size={40} />
            <h3 className="font-bold text-2xl mb-2 text-brand-navy">For Operators</h3>
            <p className="text-slate-500 mb-6">Stop driving with empty trucks. Publish your available routes, fill your remaining capacity, and increase your revenue per trip.</p>
            <Link href="/operator" className="bg-brand-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition">Go to Operator Portal</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
