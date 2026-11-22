"use client";
import React, { createContext, useContext, useState } from "react";

export type Shipment = {
  id: string; msmeName: string; origin: string; dest: string; cargo: string; 
  weight: number; volume: number;
  status: "Pending" | "Matched" | "In Transit" | "Delivered" | "Cancelled";
  date: string;
  timeline: { status: string; time: string }[];
};

export type Truck = {
  id: string; plate: string; type: string; maxWeight: number; maxVolume: number;
  currentWeight: number; currentVolume: number; 
  route: string; departure: string; 
  status: "Available" | "In Transit" | "Maintenance";
  verificationStatus: "Pending" | "Verified" | "Rejected";
};

export type Booking = {
  id: string; shipmentId: string; truckId: string; 
  operator: string; 
  totalCost: number; platformFee: number; operatorPayout: number;
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
  addTruck: (t: Omit<Truck, "id" | "status" | "currentWeight" | "currentVolume" | "verificationStatus">) => void;
  verifyTruck: (truckId: string, status: "Verified" | "Rejected") => void;
  createBooking: (shipmentId: string, truckId: string, cost: number) => void;
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void;
  cancelBooking: (bookingId: string) => void;
  markNotificationRead: (id: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>([
    { id: "SHP-1001", msmeName: "Aling Nena's Bakery", origin: "Manila", dest: "Batangas", cargo: "Flour Sacks", weight: 500, volume: 2, status: "Matched", date: "2025-11-28", timeline: [{ status: "Booking Created", time: "Nov 27, 9:00 AM" }] },
    { id: "SHP-1002", msmeName: "TechHub Gadgets", origin: "Manila", dest: "Batangas", cargo: "Monitors", weight: 300, volume: 3, status: "Matched", date: "2025-11-28", timeline: [{ status: "Booking Created", time: "Nov 27, 10:00 AM" }] },
  ]);

  const [trucks, setTrucks] = useState<Truck[]>([
    { id: "TRK-01", plate: "ABC-123", type: "Closed Van", maxWeight: 2000, maxVolume: 12, currentWeight: 800, currentVolume: 5, route: "Manila - Batangas", departure: "Daily 8:00 AM", status: "Available", verificationStatus: "Verified" },
    { id: "TRK-02", plate: "XYZ-789", type: "Flatbed", maxWeight: 5000, maxVolume: 20, currentWeight: 0, currentVolume: 0, route: "Cebu - Mandaue", departure: "Mon/Wed/Fri", status: "Available", verificationStatus: "Pending" },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: "BKG-5001", shipmentId: "SHP-1001", truckId: "TRK-01", operator: "Northstar Trucking", totalCost: 3200, platformFee: 160, operatorPayout: 3040, status: "Confirmed" },
    { id: "BKG-5002", shipmentId: "SHP-1002", truckId: "TRK-01", operator: "Northstar Trucking", totalCost: 2500, platformFee: 125, operatorPayout: 2375, status: "Confirmed" }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "NOT-1", title: "Welcome to LoadLoop", message: "Your account is ready.", time: "2 hours ago", read: false, type: "system" }
  ]);

  const addNotification = (title: string, message: string, type: Notification["type"]) => {
    setNotifications(prev => [{ id: `NOT-${Date.now()}`, title, message, time: "Just now", read: false, type }, ...prev]);
  };

  const addShipment = (data: Omit<Shipment, "id" | "status" | "timeline">) => {
    const newShipment: Shipment = { ...data, id: `SHP-${Math.floor(Math.random() * 9000) + 1000}`, status: "Pending", timeline: [{ status: "Booking Created", time: "Just now" }] };
    setShipments([newShipment, ...shipments]);
    addNotification("Shipment Created", `Your request for ${data.cargo} is now looking for a match.`, "system");
  };

  const addTruck = (data: Omit<Truck, "id" | "status" | "currentWeight" | "currentVolume" | "verificationStatus">) => {
    const newTruck: Truck = { ...data, id: `TRK-${Math.floor(Math.random() * 90) + 10}`, currentWeight: 0, currentVolume: 0, status: "Available", verificationStatus: "Pending" };
    setTrucks([...trucks, newTruck]);
    addNotification("Truck Submitted", `Truck ${data.plate} is pending admin verification.`, "system");
  };

  const verifyTruck = (truckId: string, status: "Verified" | "Rejected") => {
    setTrucks(trucks.map(t => t.id === truckId ? { ...t, verificationStatus: status } : t));
  };

  const createBooking = (shipmentId: string, truckId: string, cost: number) => {
    const shipment = shipments.find(s => s.id === shipmentId);
    if (!shipment) return;

    const fee = cost * 0.05;
    const newBooking: Booking = {
      id: `BKG-${Math.floor(Math.random() * 9000) + 1000}`,
      shipmentId, truckId, operator: "Northstar Trucking", 
      totalCost: cost, platformFee: fee, operatorPayout: cost - fee, 
      status: "Pending"
    };

    setBookings([newBooking, ...bookings]);
    setShipments(shipments.map(s => s.id === shipmentId ? { ...s, status: "Matched", timeline: [...s.timeline, { status: "Matched with Truck", time: "Just now" }] } : s));
    addNotification("Booking Requested", `Waiting for operator to accept booking.`, "booking");
  };

  const updateBookingStatus = (bookingId: string, status: Booking["status"]) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
    
    const shipStatus = status === "Confirmed" ? "Matched" : status === "Rejected" ? "Pending" : status;
    
    if (status === "Confirmed" && booking.status === "Pending") {
      const shipment = shipments.find(s => s.id === booking.shipmentId);
      if (shipment) {
        setTrucks(trucks.map(t => t.id === booking.truckId ? { ...t, currentWeight: t.currentWeight + shipment.weight, currentVolume: t.currentVolume + shipment.volume } : t));
      }
    }

    if (status === "Rejected" && booking.status === "Confirmed") {
       const shipment = shipments.find(s => s.id === booking.shipmentId);
       if (shipment) {
         setTrucks(trucks.map(t => t.id === booking.truckId ? { ...t, currentWeight: Math.max(0, t.currentWeight - shipment.weight), currentVolume: Math.max(0, t.currentVolume - shipment.volume) } : t));
       }
    }

    setShipments(shipments.map(s => {
      if (s.id === booking.shipmentId) {
        const newTimeline = s.status !== shipStatus ? [...s.timeline, { status: `Status: ${shipStatus}`, time: "Just now" }] : s.timeline;
        return { ...s, status: shipStatus as any, timeline: newTimeline };
      }
      return s;
    }));
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;
    if (booking.status === "Delivered") return alert("Cannot cancel a delivered shipment.");

    const shipment = shipments.find(s => s.id === booking.shipmentId);
    
    if ((booking.status === "Confirmed" || booking.status === "In Transit") && shipment) {
      setTrucks(trucks.map(t => t.id === booking.truckId ? { ...t, currentWeight: Math.max(0, t.currentWeight - shipment.weight), currentVolume: Math.max(0, t.currentVolume - shipment.volume) } : t));
    }

    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: "Cancelled" } : b));
    setShipments(shipments.map(s => s.id === booking.shipmentId ? { ...s, status: "Cancelled", timeline: [...s.timeline, { status: "Booking Cancelled", time: "Just now" }] } : s));
    addNotification("Booking Cancelled", `Booking ${bookingId} was cancelled.`, "status");
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{ shipments, trucks, bookings, notifications, addShipment, addTruck, verifyTruck, createBooking, updateBookingStatus, cancelBooking, markNotificationRead }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
