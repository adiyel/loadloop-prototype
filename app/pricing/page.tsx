import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-slate-200">
        <Logo className="h-10" />
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-navy transition">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>
      <main className="max-w-3xl mx-auto px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-brand-navy mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-slate-600 mb-12">Free for MSMEs. We only make money when you do.</p>
        
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 max-w-lg mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue to-brand-orange"></div>
          <h3 className="font-bold text-2xl mb-2 text-brand-navy">Pay-As-You-Ship</h3>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-5xl font-bold text-brand-navy">5%</span>
            <span className="text-slate-500 font-semibold">platform fee</span>
          </div>
          <ul className="space-y-4 text-left mb-8">
            {["Free to create an account", "Free to post a shipment", "Free to browse the Load Board", "5% fee charged only when a booking is confirmed", "No monthly subscriptions"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                <CheckCircle2 className="text-green-500 shrink-0" size={20} /> {item}
              </li>
            ))}
          </ul>
          <Link href="/dashboard" className="block w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition">
            Start Shipping Now
          </Link>
        </div>
      </main>
    </div>
  );
}
