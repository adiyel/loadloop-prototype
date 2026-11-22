const colors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Matched: "bg-teal-100 text-teal-700",
  "In Transit": "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-rose-100 text-rose-700",
  Active: "bg-green-100 text-green-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors[status] ?? "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}
