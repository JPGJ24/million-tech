"use client";

import { Building } from "lucide-react";

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Building className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold  leading-tight">MILLION</span>
      </div>
    </div>
  );
}
