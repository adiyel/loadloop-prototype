export type Shipment = {
  id: string;
  route: string;
  pickup: string;
  dropoff: string;
  date: string;
  cargo: string;
  weight: string;
  status: "Pending" | "Matched" | "In Transit" | "Delivered" | "Cancelled";
  cost: string;
  truck: string;
};

export const shipments: Shipment[] = [
  { id: "LL-1042", route: "Manila → Batangas", pickup: "Taguig City", dropoff: "Batangas City", date: "2025-11-28", cargo: "Furniture (4 boxes)", weight: "180 kg", status: "Matched", cost: "₱3,200", truck: "Truck #T-08 · Isuzu Elf" },
  { id: "LL-1041", route: "Manila → Laguna", pickup: "Pasig City", dropoff: "Calamba", date: "2025-11-27", cargo: "Packaged food", weight: "90 kg", status: "In Transit", cost: "₱1,800", truck: "Truck #T-03 · Fuso Canter" },
  { id: "LL-1040", route: "Cebu → Mandaue", pickup: "Cebu City", dropoff: "Mandaue City", date: "2025-11-26", cargo: "Apparel", weight: "45 kg", status: "Delivered", cost: "₱950", truck: "Truck #T-11 · Hino 300" },
  { id: "LL-1039", route: "Manila → Pampanga", pickup: "Quezon City", dropoff: "San Fernando", date: "2025-11-25", cargo: "Hardware supplies", weight: "260 kg", status: "Delivered", cost: "₱2,450", truck: "Truck #T-02 · Isuzu N-series" },
  { id: "LL-1038", route: "Davao → Tagum", pickup: "Davao City", dropoff: "Tagum City", date: "2025-11-24", cargo: "Fresh produce", weight: "320 kg", status: "Pending", cost: "₱2,100", truck: "Awaiting match" },
];

export const users = [
  { id: "U-201", name: "Aling Nena's Bakery", role: "MSME", email: "orders@nena.ph", shipments: 12, status: "Active" },
  { id: "U-202", name: "TechHub Gadgets", role: "MSME", email: "ship@techhub.ph", shipments: 8, status: "Active" },
  { id: "U-203", name: "Northstar Trucking", role: "Operator", email: "ops@northstar.ph", shipments: 47, status: "Active" },
  { id: "U-204", name: "GreenLeaf Organics", role: "MSME", email: "logistics@greenleaf.ph", shipments: 5, status: "Pending" },
  { id: "U-205", name: "MetroHaul Logistics", role: "Operator", email: "dispatch@metrohaul.ph", shipments: 33, status: "Active" },
];
