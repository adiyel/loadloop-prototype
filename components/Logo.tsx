export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-extrabold text-2xl tracking-tighter ${className}`}>
      <svg viewBox="0 0 100 50" className="h-full w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C 30 10, 10 25, 10 40 C 10 50, 25 50, 40 40 C 50 30, 60 10, 75 10 C 90 10, 90 25, 85 30" stroke="currentColor" strokeWidth="6" fill="none" className="text-brand-blue" />
        <path d="M15 20 L 30 20 M 20 15 L 25 15" stroke="currentColor" strokeWidth="4" className="text-brand-orange" strokeLinecap="round"/>
        <circle cx="85" cy="30" r="5" className="fill-brand-orange" />
        <path d="M 70 35 L 85 35" stroke="currentColor" strokeWidth="4" className="text-brand-navy" strokeLinecap="round"/>
      </svg>
      <span>
        <span className="text-brand-navy">LOAD</span><span className="text-brand-orange">LOOP</span>
      </span>
    </div>
  );
}
