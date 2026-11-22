// ... (imports)
export default function LoadBoard() {
  const { trucks, shipments, createBooking } = useApp();
  // ...
  
  // ONLY show Verified trucks with capacity > 0
  const validTrucks = trucks.filter(t => t.verificationStatus === "Verified" && t.currentLoad < t.maxCapacity);

  return (
    // ...
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {validTrucks.map((truck) => {
          const availableCapacity = truck.maxCapacity - truck.currentLoad;
          const isOverCapacity = pendingShipment && pendingShipment.weight > availableCapacity;

          return (
            <div key={truck.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
              {/* ... card content ... */}
              
              <button 
                onClick={() => setSelectedTruck(truck.id)}
                disabled={!pendingShipment || isOverCapacity}
                className={`w-full py-2.5 rounded-lg border-2 font-semibold transition ${
                  !pendingShipment ? "border-slate-100 text-slate-400 cursor-not-allowed" :
                  isOverCapacity ? "border-rose-200 text-rose-500 bg-rose-50 cursor-not-allowed" :
                  "border-slate-100 text-brand-navy hover:bg-brand-orange hover:border-brand-orange hover:text-white"
                }`}
              >
                {!pendingShipment ? "No Pending Shipment" : 
                 isOverCapacity ? "Insufficient Capacity" : 
                 "Select Truck"}
              </button>
            </div>
          );
        })}
      </div>
    // ...
  );
}
