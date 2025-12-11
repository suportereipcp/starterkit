import { Shield } from "lucide-react";

export function Logo() {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">PCP Suporte Rei</span>
        </div>
    );
}
