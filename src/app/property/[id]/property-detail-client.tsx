"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Property } from "@/interface";
import { OwnerCard } from "@/features/property/owner-card";
import { AgentCard } from "@/features/property/agent-card";
import { Details } from "@/features/property/details";
import { Gallery } from "@/features/property/gallery";

interface PropertyDetailClientProps {
  property: Property;
}

const PropertyDetailClient = ({ property }: PropertyDetailClientProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-16 bg-white border-b z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/properties"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <Gallery property={property} />

            {/* Property Info */}
            <Details property={property} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <OwnerCard property={property} />

            <AgentCard property={property} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailClient;
