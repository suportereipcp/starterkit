import { BarChart3 } from "lucide-react"; // Using BarChart3 as closest match to the graph icon in the image

export function Logo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Icon */}
            <div className="relative flex items-center justify-center text-[#2b79c1]">
                <BarChart3 className="h-10 w-10 rotate-180" strokeWidth={2.5} />
                {/* Custom styling to attempt to match the vertical bars circle look could be complex, 
             so sticking to a clean Lucid icon as placeholder for "PingPing" graph logo */}
            </div>
            {/* Text */}
            <span className="text-4xl font-bold tracking-tight text-[#2B4964] font-sans">
                PingPing
            </span>
        </div>
    );
}
