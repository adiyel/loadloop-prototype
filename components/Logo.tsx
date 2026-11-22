import Image from "next/image";

export default function Logo({ className = "h-10 w-auto object-contain" }: { className?: string }) {
  return (
    <div className="flex items-center">
      <Image
        src="/loadloop-logo.png" // Ensure this matches your filename exactly
        alt="LoadLoop Logo"
        width={300}              // Set a high base width
        height={80}              // Set a high base height
        className={className}    // This will constrain it correctly
        priority                 
      />
    </div>
  );
}
