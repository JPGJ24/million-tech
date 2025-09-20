"use client";

import { useState } from "react";
import { Home, Building2 } from "lucide-react";
import { PropertyCard } from "@/components/ui/property-card";
import { PropertySearch } from "@/components/ui/property-search";
import { Property } from "@/interface";
import { LayoutGrid, List, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/contexts";
import { LoaderSection } from "@/components/ui/loading";
import { ErrorSection } from "@/components/ui/error";

export default function PropertiesPage() {
  const { loading, error, getPropertiesByType } = useProperties();
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [propertyType, setPropertyType] = useState<"all" | "sale" | "rent">(
    "all"
  );

  const handleSearchResults = (results: Property[]) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  const typeFilteredProperties = hasSearched
    ? searchResults.filter((property) => {
        if (propertyType === "all") return true;
        return property.priceType === propertyType;
      })
    : getPropertiesByType(propertyType);

  if (loading) {
    return <LoaderSection />;
  }

  if (error) {
    return <ErrorSection error={error} />;
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-2/6">
            {/* Property Type Toggle */}
            <div className="flex justify-between bg-gray-100 rounded-lg p-1 px-3 mb-4">
              <Button
                onClick={() => setPropertyType("all")}
                className={`px-4 py-2 rounded-md font-medium transition-all text-sm cursor-pointer ${
                  propertyType === "all"
                    ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                    : "text-gray-600 hover:text-gray-900 bg-transparent hover:bg-white"
                }`}
              >
                All
              </Button>
              <Button
                onClick={() => setPropertyType("sale")}
                className={`px-4 py-2 rounded-md font-medium transition-all text-sm flex items-center gap-2 cursor-pointer ${
                  propertyType === "sale"
                    ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                    : "text-gray-600 hover:text-gray-900 bg-transparent hover:bg-white"
                }`}
              >
                <Home className="w-4 h-4" />
                Sale
              </Button>
              <Button
                onClick={() => setPropertyType("rent")}
                className={`px-4 py-2 rounded-md font-medium transition-all text-sm flex items-center gap-2 cursor-pointer ${
                  propertyType === "rent"
                    ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                    : "text-gray-600 hover:text-gray-900 bg-transparent hover:bg-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Rent
              </Button>
            </div>

            <h1 className="text-3xl font-bold brand-purple mb-2">
              {hasSearched
                ? "Resultados de búsqueda"
                : propertyType === "sale"
                ? "Properties for Sale"
                : propertyType === "rent"
                ? "Properties for Rent"
                : "Properties for Florida"}
            </h1>
            <p className="text-gray-600">
              {hasSearched
                ? `${typeFilteredProperties.length} propiedades encontradas`
                : `${typeFilteredProperties.length} properties found`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Clear Search Button */}
            <PropertySearch onResultsChange={handleSearchResults} />
            {hasSearched && (
              <Button
                variant="primary"
                onClick={() => {
                  setSearchResults([]);
                  setHasSearched(false);
                }}
                className="text-white hover:text-white cursor-pointer"
              >
                Clear search
              </Button>
            )}

            {/* View Mode */}
            <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-white shadow-sm" : ""}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-white shadow-sm" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("map")}
                className={viewMode === "map" ? "bg-white shadow-sm" : ""}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {typeFilteredProperties.map((property) => (
            <PropertyCard
              key={property.idOwner}
              property={property}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Load More */}
        {typeFilteredProperties.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600">No properties found</p>
          </div>
        )}
      </div>
    </div>
  );
}
