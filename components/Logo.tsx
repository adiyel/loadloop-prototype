import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src="/loadloop-logo.png" // Ensure this is in the /public folder
        alt="LoadLoop Logo"
        width={200}              // Base width for Next.js optimization
        height={50}              // Base height for Next.js optimization
        className="object-contain w-auto h-8 md:h-10" // Auto width, clean height
        priority
      />
    </div>
  );
}
