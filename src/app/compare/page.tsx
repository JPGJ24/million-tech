"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/contexts";
import { ErrorSection } from "@/components/ui/error";
import { LoaderSection } from "@/components/ui/loading";
import { Details } from "@/features/compare/details";
import { PropertyCard } from "@/features/compare/property-card";
import { SearchModal } from "@/features/compare/search-modal";
import { Header } from "@/features/compare/header";
import { useCompareProperties } from "@/hooks/useCompareProperties";

export default function ComparePage() {
  const {
    selectedProperties,
    filteredProperties,
    searchTerm,
    showSearch,
    setShowSearch,
    setSearchTerm,
    addProperty,
    removeProperty,
    isHighlighted,
  } = useCompareProperties();

  const { loading, error } = useProperties();

  if (loading) {
    return <LoaderSection />;
  }

  if (error) {
    return <ErrorSection error={error} />;
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      {/* Header */}
      <Header
        selectedProperties={selectedProperties}
        setShowSearch={setShowSearch}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Modal */}
        {showSearch && (
          <SearchModal
            filteredProperties={filteredProperties}
            selectedProperties={selectedProperties}
            addProperty={addProperty}
            setShowSearch={setShowSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {/* Empty State */}
        {selectedProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-brand-primary" />
            </div>
            <h2 className="text-2xl font-bold brand-purple mb-4">
              Start your comparison
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Select up to 3 properties to compare side by side and find the
              perfect option for you
            </p>
            <Button
              onClick={() => setShowSearch(true)}
              className="brand-primary-bg hover:bg-brand-primary/90 text-white cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Property
            </Button>
          </div>
        )}

        {/* Comparison Table */}
        {selectedProperties.length > 0 && (
          <div className="space-y-8">
            {/* Property Cards */}
            <div
              className={`grid gap-6 ${
                selectedProperties.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : selectedProperties.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {selectedProperties.map((property) => (
                <PropertyCard
                  key={property.idOwner}
                  property={property}
                  removeProperty={removeProperty}
                />
              ))}
            </div>

            {/* Comparison Details */}
            <Details
              selectedProperties={selectedProperties}
              isHighlighted={isHighlighted}
            />

            {/* Add More Properties */}
            {selectedProperties.length < 3 && (
              <div className="text-center">
                <Button
                  onClick={() => setShowSearch(true)}
                  variant="outline"
                  className="border-brand-primary text-brand-primary cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Property ({selectedProperties.length}/3)
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
