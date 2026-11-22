import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, Truck, Map, ShieldCheck } from "lucide-react";

export default function Platform() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-slate-200">
        <Logo className="h-10" />
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-navy transition">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>
      <main className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-brand-navy mb-4">The LoadLoop Platform</h1>
        <p className="text-lg text-slate-600 mb-12">Everything you need to match, manage, and move freight efficiently.</p>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <Truck className="text-brand-blue mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Smart Matching</h3>
            <p className="text-sm text-slate-500">Our algorithm pairs your shipment with trucks that have available capacity on your specific route.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <Map className="text-brand-orange mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Live Tracking</h3>
            <p className="text-sm text-slate-500">Monitor your cargo from pickup to delivery with our real-time visual tracking interface.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <ShieldCheck className="text-green-500 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Verified Operators</h3>
            <p className="text-sm text-slate-500">We verify every truck and operator so you can ship with confidence and peace of mind.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
