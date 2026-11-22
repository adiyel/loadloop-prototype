"use client";
import React, { createContext, useContext, useState } from "react";

export type Shipment = {
  id: string; origin: string; dest: string; cargo: string; weight: number;
  status: "Pending" | "Matched" | "Picked Up" | "In Transit" | "Delivered" | "Cancelled";
  date: string;
  timeline: { status: string; time: string }[];
};

export type Truck = {
  id: string; plate: string; type: string; maxCapacity: number; 
  currentLoad: number; route: string; departure: string; 
  status: "Available" | "In Transit" | "Maintenance";
  verificationStatus: "Pending" | "Verified" | "Rejected";
};

export type Booking = {
  id: string; shipmentId: string; truckId: string; 
  operator: string; cost: number; platformFee: number;
  status: "Pending" | "Confirmed" | "In Transit" | "Delivered" | "Rejected" | "Cancelled";
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
  addShipment: (s: Omit<Shipment, "id" | "status" | "timeline">) => void;
  addTruck: (t: Omit<Truck, "id" | "status" | "currentLoad" | "verificationStatus">) => void;
  verifyTruck: (truckId: string, status: "Verified" | "Rejected") => void;
  createBooking: (shipmentId: string, truckId: string, cost: number) => void;
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void;
  cancelBooking: (bookingId: string) => void;
  addNotification: (title: string, message: string, type: Notification["type"]) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>([
    { id: "SHP-1001", origin: "Manila", dest: "Batangas", cargo: "Furniture", weight: 180, status: "Matched", date: "2025-11-28", timeline: [{ status: "Booking Created", time: "Nov 27, 9:00 AM" }, { status: "Matched with Truck", time: "Nov 27, 10:00 AM" }] },
  ]);

  const [trucks, setTrucks] = useState<Truck[]>([
    { id: "TRK-01", plate: "ABC-123", type: "Closed Van", maxCapacity: 2000, currentLoad: 180, route: "Manila - Batangas", departure: "Daily 8:00 AM", status: "Available", verificationStatus: "Verified" },
    { id: "TRK-02", plate: "XYZ-789", type: "Flatbed", maxCapacity: 5000, currentLoad: 0, route: "Cebu - Mandaue", departure: "Mon/Wed/Fri", status: "Available", verificationStatus: "Pending" },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: "BKG-5001", shipmentId: "SHP-1001", truckId: "TRK-01", operator: "Northstar Trucking", cost: 3200, platformFee: 160, status: "Confirmed" }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (title: string, message: string, type: Notification["type"]) => {
    setNotifications(prev => [{ id: `NOT-${Date.now()}`, title, message, time: "Just now", read: false, type }, ...prev]);
  };

  const addShipment = (data: Omit<Shipment, "id" | "status" | "timeline">) => {
    const newShipment: Shipment = { ...data, id: `SHP-${Math.floor(Math.random() * 9000) + 1000}`, status: "Pending", timeline: [{ status: "Booking Created", time: "Just now" }] };
    setShipments([newShipment, ...shipments]);
    addNotification("Shipment Created", `Your request for ${data.cargo} is now looking for a match.`, "system");
  };

  const addTruck = (data: Omit<Truck, "id" | "status" | "currentLoad" | "verificationStatus">) => {
    const newTruck: Truck = { ...data, id: `TRK-${Math.floor(Math.random() * 90) + 10}`, currentLoad: 0, status: "Available", verificationStatus: "Pending" };
    setTrucks([...trucks, newTruck]);
    addNotification("Truck Submitted", `Truck ${data.plate} is pending admin verification.`, "system");
  };

  const verifyTruck = (truckId: string, status: "Verified" | "Rejected") => {
    setTrucks(trucks.map(t => t.id === truckId ? { ...t, verificationStatus: status } : t));
    addNotification(`Truck ${status}`, `Truck ${truckId} verification was ${status.toLowerCase()}.`, "system");
  };

  const createBooking = (shipmentId: string, truckId: string, cost: number) => {
    const truck = trucks.find(t => t.id === truckId);
    const shipment = shipments.find(s => s.id === shipmentId);
    if (!truck || !shipment) return;

    const newBooking: Booking = {
      id: `BKG-${Math.floor(Math.random() * 9000) + 1000}`,
      shipmentId, truckId, operator: "Northstar Trucking", cost, platformFee: cost * 0.05, status: "Pending"
    };

    setBookings([newBooking, ...bookings]);
    setShipments(shipments.map(s => s.id === shipmentId ? { ...s, status: "Matched", timeline: [...s.timeline, { status: "Matched with Truck", time: "Just now" }] } : s));
    addNotification("Booking Requested", `Waiting for operator to accept booking for ${shipmentId}.`, "booking");
  };

  const updateBookingStatus = (bookingId: string, status: Booking["status"]) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
    
    const shipStatus = status === "Confirmed" ? "Matched" : status === "Rejected" ? "Pending" : status;
    const truckStatus = status === "In Transit" ? "In Transit" : status === "Delivered" ? "Available" : undefined;

    setShipments(shipments.map(s => {
      if (s.id === booking.shipmentId) {
        const newTimeline = s.status !== shipStatus ? [...s.timeline, { status: `Status: ${shipStatus}`, time: "Just now" }] : s.timeline;
        return { ...s, status: shipStatus as any, timeline: newTimeline };
      }
      return s;
    }));

    if (truckStatus) {
      setTrucks(trucks.map(t => t.id === booking.truckId ? { ...t, status: truckStatus } : t));
    }

    if (status === "Confirmed") {
      const shipment = shipments.find(s => s.id === booking.shipmentId);
      setTrucks(trucks.map(t => t.id === booking.truckId ? { ...t, currentLoad: t.currentLoad + (shipment?.weight || 0) } : t));
      addNotification("Booking Confirmed", `Operator accepted booking ${bookingId}.`, "booking");
    }

    if (status === "Delivered") {
       addNotification("Shipment Delivered", `Booking ${bookingId} has been successfully delivered.`, "status");
    }
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const shipment = shipments.find(s => s.id === booking.shipmentId);
    
    // Restore capacity
    if (booking.status === "Confirmed" || booking.status === "In Transit") {
      setTrucks(trucks.map(t => t.id === booking.truckId ? { ...t, currentLoad: Math.max(0, t.currentLoad - (shipment?.weight || 0)) } : t));
    }

    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: "Cancelled" } : b));
    setShipments(shipments.map(s => s.id === booking.shipmentId ? { ...s, status: "Cancelled", timeline: [...s.timeline, { status: "Booking Cancelled", time: "Just now" }] } : s));
    addNotification("Booking Cancelled", `Booking ${bookingId} was cancelled.`, "status");
  };

  return (
    <AppContext.Provider value={{ shipments, trucks, bookings, notifications, addShipment, addTruck, verifyTruck, createBooking, updateBookingStatus, cancelBooking, addNotification }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
