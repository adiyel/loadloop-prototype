"use client";
import React, { createContext, useContext, useState } from "react";

export type Shipment = {
  id: string; origin: string; dest: string; cargo: string; weight: number;
  status: "Pending" | "Matched" | "In Transit" | "Delivered" | "Cancelled";
  date: string;
};

export type Truck = {
  id: string; plate: string; type: string; maxCapacity: number; 
  currentLoad: number; route: string; departure: string; 
  status: "Available" | "In Transit" | "Maintenance";
};

export type Booking = {
  id: string; shipmentId: string; truckId: string; 
  operator: string; cost: number; platformFee: number;
  status: "Pending" | "Confirmed" | "In Transit" | "Delivered" | "Rejected";
};

export type Notification = {
  id: string; title: string; message: string; time: string; read: boolean;
  type: "booking" | "status" | "system";
};

type AppContextType = {
  shipments: Shipment[];
  trucks: Truck[];
  bookings: Booking[];
  notifications: Notification[];
  addShipment: (s: Omit<Shipment, "id" | "status">) => void;
  addTruck: (t: Omit<Truck, "id" | "status" | "currentLoad">) => void;
  createBooking: (shipmentId: string, truckId: string, cost: number) => void;
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void;
  markNotificationRead: (id: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>([
    { id: "SHP-1001", origin: "Manila", dest: "Batangas", cargo: "Furniture", weight: 180, status: "Matched", date: "2025-11-28" },
    { id: "SHP-1002", origin: "Cebu", dest: "Mandaue", cargo: "Apparel", weight: 45, status: "Pending", date: "2025-11-29" },
  ]);

  const [trucks, setTrucks] = useState<Truck[]>([
    { id: "TRK-01", plate: "ABC-123", type: "Closed Van", maxCapacity: 2000, currentLoad: 180, route: "Manila - Batangas", departure: "Daily 8:00 AM", status: "Available" },
    { id: "TRK-02", plate: "XYZ-789", type: "Flatbed", maxCapacity: 5000, currentLoad: 0, route: "Cebu - Mandaue", departure: "Mon/Wed/Fri", status: "Available" },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: "BKG-5001", shipmentId: "SHP-1001", truckId: "TRK-01", operator: "Northstar Trucking", cost: 3200, platformFee: 160, status: "Confirmed" }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "NOT-1", title: "Booking Confirmed", message: "Your shipment SHP-1001 has been confirmed by Northstar Trucking.", time: "2 hours ago", read: false, type: "booking" }
  ]);

  const addShipment = (data: Omit<Shipment, "id" | "status">) => {
    const newShipment: Shipment = { ...data, id: `SHP-${Math.floor(Math.random() * 9000) + 1000}`, status: "Pending" };
    setShipments([newShipment, ...shipments]);
    addNotification("Shipment Created", `Your request for ${data.cargo} to ${data.dest} is now looking for a match.`, "system");
  };

  const addTruck = (data: Omit<Truck, "id" | "status" | "currentLoad">) => {
    const newTruck: Truck = { ...data, id: `TRK-${Math.floor(Math.random() * 90) + 10}`, currentLoad: 0, status: "Available" };
    setTrucks([...trucks, newTruck]);
    addNotification("Truck Registered", `Truck ${data.plate} is now live on the Load Board.`, "system");
  };

  const createBooking = (shipmentId: string, truckId: string, cost: number) => {
    const truck = trucks.find(t => t.id === truckId);
    const shipment = shipments.find(s => s.id === shipmentId);
    if (!truck || !shipment) return;

    const newBooking: Booking = {
      id: `BKG-${Math.floor(Math.random() * 9000) + 1000}`,
      shipmentId, truckId, operator: "Northstar Trucking", // Hardcoded operator for demo
      cost, platformFee: cost * 0.05, status: "Pending"
    };

    setBookings([newBooking, ...bookings]);
    setShipments(shipments.map(s => s.id === shipmentId ? { ...s, status: "Matched" } : s));
    addNotification("Booking Requested", `Waiting for operator to accept booking for ${shipmentId}.`, "booking");
  };

  const updateBookingStatus = (bookingId: string, status: Booking["status"]) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
    
    // Sync Shipment Status
    const shipStatus = status === "Confirmed" ? "Matched" : status === "Rejected" ? "Pending" : status;
    setShipments(shipments.map(s => s.id === booking.shipmentId ? { ...s, status: shipStatus as any } : s));

    // Update Truck Capacity if confirmed
    if (status === "Confirmed") {
      const shipment = shipments.find(s => s.id === booking.shipmentId);
      setTrucks(trucks.map(t => t.id === booking.truckId ? { ...t, currentLoad: t.currentLoad + (shipment?.weight || 0) } : t));
      addNotification("Booking Confirmed", `Operator accepted booking ${bookingId}.`, "booking");
    }
  };

  const addNotification = (title: string, message: string, type: Notification["type"]) => {
    setNotifications(prev => [{ id: `NOT-${Date.now()}`, title, message, time: "Just now", read: false, type }, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{ shipments, trucks, bookings, notifications, addShipment, addTruck, createBooking, updateBookingStatus, markNotificationRead }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
