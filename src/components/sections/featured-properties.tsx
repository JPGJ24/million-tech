"use client";

import { PropertyCard } from "@/components/ui/property-card";
import { LoaderSection } from "@/components/ui/loading";
import { useProperties } from "@/contexts";
import { ErrorSection } from "@/components/ui/error";

const FeaturedProperties = () => {
  const { properties, loading, error } = useProperties();

  if (loading) {
    return <LoaderSection />;
  }

  if (error) {
    return <ErrorSection error={error} />;
  }

  return (
    <section
      id="search-results"
      className="py-16 brand-light-bg animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {properties?.slice(0, 3).map((property) => (
            <PropertyCard key={property.idOwner} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedProperties;
