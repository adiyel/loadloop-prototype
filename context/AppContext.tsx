"use client";
import React, { createContext, useContext, useState } from "react";

// Types
export type Shipment = {
  id: string; origin: string; dest: string; cargo: string; weight: string;
  status: "Pending" | "Confirmed" | "In Transit" | "Delivered" | "Cancelled";
  cost: string; operator: string; date: string;
};

export type Truck = {
  id: string; plate: string; type: string; capacity: string;
  route: string; departure: string; status: "Available" | "In Transit" | "Maintenance";
};

type AppContextType = {
  shipments: Shipment[];
  trucks: Truck[];
  addShipment: (s: Omit<Shipment, "id" | "status" | "operator" | "cost">) => void;
  updateShipmentStatus: (id: string, status: Shipment["status"]) => void;
  addTruck: (t: Omit<Truck, "id" | "status">) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>([
    { id: "SHP-1001", origin: "Manila", dest: "Batangas", cargo: "Furniture", weight: "180 kg", status: "In Transit", cost: "₱3,200", operator: "Northstar Trucking", date: "Nov 28, 2025" },
    { id: "SHP-1002", origin: "Cebu", dest: "Mandaue", cargo: "Apparel", weight: "45 kg", status: "Pending", cost: "₱950", operator: "Unassigned", date: "Nov 29, 2025" },
  ]);

  const [trucks, setTrucks] = useState<Truck[]>([
    { id: "TRK-01", plate: "ABC-123", type: "Closed Van", capacity: "2,000 kg", route: "Manila - Batangas", departure: "Daily 8:00 AM", status: "Available" },
    { id: "TRK-02", plate: "XYZ-789", type: "Flatbed", capacity: "5,000 kg", route: "Cebu - Mandaue", departure: "Mon/Wed/Fri", status: "In Transit" },
  ]);

  const addShipment = (data: Omit<Shipment, "id" | "status" | "operator" | "cost">) => {
    const newShipment: Shipment = {
      ...data,
      id: `SHP-${Math.floor(Math.random() * 9000) + 1000}`,
      status: "Pending",
      operator: "Searching...",
      cost: `₱${Math.floor(Math.random() * 5) + 1},000`, // Simulated cost
    };
    setShipments([newShipment, ...shipments]);
  };

  const updateShipmentStatus = (id: string, status: Shipment["status"]) => {
    setShipments(shipments.map(s => s.id === id ? { ...s, status } : s));
  };

  const addTruck = (data: Omit<Truck, "id" | "status">) => {
    const newTruck: Truck = {
      ...data,
      id: `TRK-${Math.floor(Math.random() * 90) + 10}`,
      status: "Available"
    };
    setTrucks([...trucks, newTruck]);
  };

  return (
    <AppContext.Provider value={{ shipments, trucks, addShipment, updateShipmentStatus, addTruck }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
