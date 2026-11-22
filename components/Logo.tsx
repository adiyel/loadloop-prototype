import Image from "next/image";

export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <div className="flex items-center">
      <Image
        src="/loadloop-logo.png" // Ensure this matches the exact filename in your public folder
        alt="LoadLoop Logo"
        width={180}               // Adjust this based on the actual width of your image
        height={50}               // Adjust this based on the actual height of your image
        className={className}
        priority                  // Preloads the logo since it's above the fold
      />
    </div>
  );
}
