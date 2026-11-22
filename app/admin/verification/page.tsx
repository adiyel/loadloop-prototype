"use client";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, XCircle, FileText } from "lucide-react";

export default function TruckVerification() {
  const { trucks, verifyTruck } = useApp();
  const pendingTrucks = trucks.filter(t => t.verificationStatus === "Pending");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Truck Verification</h1>
      <p className="text-slate-500">Review vehicle details and approve operators.</p>

      <div className="space-y-4">
        {pendingTrucks.length === 0 ? (
           <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">No pending verifications.</div>
        ) : (
          pendingTrucks.map(truck => (
            <div key={truck.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-light rounded-xl text-brand-blue"><FileText size={24}/></div>
                <div>
                  <p className="font-bold text-brand-navy text-lg">{truck.id} - {truck.plate}</p>
                  <p className="text-sm text-slate-500">{truck.type} - {truck.maxCapacity} kg - Route: {truck.route}</p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <button onClick={() => verifyTruck(truck.id, "Rejected")} className="px-4 py-2 rounded-lg border border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 flex items-center gap-2">
                  <XCircle size={18}/> Reject
                </button>
                <button onClick={() => verifyTruck(truck.id, "Verified")} className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 flex items-center gap-2">
                  <CheckCircle2 size={18}/> Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
