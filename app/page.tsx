import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-light">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Logo className="h-10" />
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <Link href="#" className="hover:text-brand-blue transition">Platform</Link>
          <Link href="#" className="hover:text-brand-blue transition">Solutions</Link>
          <Link href="#" className="hover:text-brand-blue transition">Pricing</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard" className="px-5 py-2.5 text-sm font-bold text-brand-navy hover:bg-slate-100 rounded-lg transition">
            Log in
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 rounded-lg shadow-md transition flex items-center gap-2">
            Go to Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-brand-blue font-semibold text-sm mb-8 border border-blue-100">
          <ShieldCheck size={16} /> We Raised $2.5M to Fix Empty Truck Space
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-brand-navy tracking-tight leading-tight max-w-4xl mx-auto">
          Frictionless Freight, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-orange">
            From Dock to Doorstep.
          </span>
        </h1>
        
        <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
          LoadLoop matches MSMEs shipping along compatible routes to share one truck. Move more. Waste less.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/loadboard" className="px-8 py-4 bg-brand-navy text-white rounded-xl font-bold text-lg hover:bg-slate-800 shadow-xl transition">
            Find a Truck
          </Link>
          <Link href="/dashboard" className="px-8 py-4 bg-white text-brand-navy border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-brand-blue transition">
            View Demo Dashboard
          </Link>
        </div>

        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute -left-12 top-20 glass-panel p-6 rounded-2xl w-56 text-left animate-bounce duration-[3000ms]">
            <p className="text-sm font-semibold text-slate-500">On-Time Reliability</p>
            <p className="text-3xl font-bold text-brand-navy mt-1">98.4%</p>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3">
              <div className="bg-brand-blue h-2 rounded-full w-[98%]"></div>
            </div>
          </div>

          <div className="absolute -right-12 top-40 glass-panel p-6 rounded-2xl text-left border-l-4 border-brand-orange shadow-lg">
            <p className="text-sm font-semibold text-slate-500">Total Cost Saved</p>
            <p className="text-3xl font-bold text-brand-orange mt-1">₱24,500</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white aspect-video flex items-center justify-center relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy via-slate-800 to-brand-blue opacity-90"></div>
             <div className="relative z-10 flex flex-col items-center text-white">
                <Truck size={80} className="mb-4 text-brand-orange" />
                <h3 className="text-3xl font-bold">LoadLoop Platform</h3>
                <p className="text-slate-300 mt-2">Connecting MSMEs with Empty Truck Space</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
