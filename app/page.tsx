"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowRight, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10"></div>
      
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto relative z-10">
        <Logo className="h-10" />
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600">
          <button onClick={() => router.push("/platform")} className="hover:text-brand-blue transition">Platform</button>
          <button onClick={() => router.push("/solutions")} className="hover:text-brand-blue transition">Solutions</button>
          <button onClick={() => router.push("/pricing")} className="hover:text-brand-blue transition">Pricing</button>
        </div>

        <div className="flex gap-4">
          <Link href="/dashboard" className="px-5 py-2.5 text-sm font-bold text-brand-navy hover:bg-slate-200 rounded-lg transition">
            Log in
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 rounded-lg shadow-md transition flex items-center gap-2">
            Go to Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-24 text-center relative z-10">
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
          <Link href="/dashboard" className="px-8 py-4 bg-white text-brand-navy border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-brand-blue hover:bg-slate-50 transition">
            View Demo Dashboard
          </Link>
        </div>

        {/* Hero Graphic */}
        <div className="mt-24 relative max-w-4xl mx-auto">
          <div className="absolute -left-12 top-12 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 w-48 text-left z-20 hidden md:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">On-Time Delivery</p>
            <p className="text-3xl font-bold text-brand-navy mt-1">98.4%</p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-brand-blue h-2 rounded-full w-[98%]"></div>
            </div>
          </div>

          <div className="absolute -right-12 top-32 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 z-20 hidden md:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Cost Saved</p>
            <p className="text-3xl font-bold text-brand-orange mt-1">₱24,500</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
            <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
              <div className="h-3 w-3 rounded-full bg-rose-400"></div>
              <div className="h-3 w-3 rounded-full bg-amber-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              <div className="mx-auto bg-white px-4 py-1 rounded-md text-xs font-medium text-slate-400 flex items-center gap-2">
                app.loadloop.com
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 flex gap-6">
              <div className="w-48 hidden md:block space-y-2">
                <div className="h-8 bg-brand-navy rounded-lg w-full mb-6"></div>
                <div className="h-8 bg-white border border-slate-200 rounded-lg w-full"></div>
                <div className="h-8 bg-white border border-slate-200 rounded-lg w-full"></div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 h-24 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center p-4">
                     <Truck className="text-brand-blue mr-4" size={32}/>
                     <div>
                       <div className="h-2 w-16 bg-slate-200 rounded mb-2"></div>
                       <div className="h-4 w-24 bg-brand-navy rounded"></div>
                     </div>
                  </div>
                  <div className="flex-1 h-24 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center p-4">
                     <CheckCircle2 className="text-green-500 mr-4" size={32}/>
                     <div>
                       <div className="h-2 w-16 bg-slate-200 rounded mb-2"></div>
                       <div className="h-4 w-24 bg-brand-navy rounded"></div>
                     </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 h-48">
                   <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                   <div className="space-y-3">
                     <div className="h-8 bg-slate-50 rounded w-full"></div>
                     <div className="h-8 bg-slate-50 rounded w-full"></div>
                     <div className="h-8 bg-slate-50 rounded w-full"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
