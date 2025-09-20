"use client";

import { Search, X, Loader2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Property } from "@/interface";
import { usePropertySearch } from "@/hooks/usePropertySearch";

interface PropertySearchProps {
  onResultsChange?: (properties: Property[]) => void;
  showResults?: boolean;
}

export function PropertySearch({ onResultsChange }: PropertySearchProps) {
  const {
    showFilters,
    setShowFilters,
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
  } = usePropertySearch(onResultsChange);

  return (
    <>
      {/* Filters button */}
      <div className="">
        <div className="">
          <div className="flex justify-center">
            <Button
              onClick={() => setShowFilters(true)}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop y Sidenav */}
      {showFilters && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
            onClick={() => setShowFilters(false)}
          />

          {/* Sidenav */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-96 sm:max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Search Filters
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Formulario de filtros */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Campo de nombre */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Property name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ej: Casa en Miami Beach"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Campo de dirección */}
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Ej: 123 Ocean Drive, Miami"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Minimum price field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="minPrice"
                    className="text-sm font-medium text-gray-700"
                  >
                    Minimum price (USD)
                  </Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="Ej: 100000"
                    value={formData.minPrice}
                    onChange={(e) =>
                      handleInputChange("minPrice", e.target.value)
                    }
                    className="w-full"
                    min="0"
                  />
                </div>

                {/* Maximum price field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="maxPrice"
                    className="text-sm font-medium text-gray-700"
                  >
                    Maximum price (USD)
                  </Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="Ej: 500000"
                    value={formData.maxPrice}
                    onChange={(e) =>
                      handleInputChange("maxPrice", e.target.value)
                    }
                    className="w-full"
                    min="0"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-3 pt-2 sm:pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white cursor-pointer text-sm sm:text-base py-2 sm:py-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        <span className="hidden sm:inline">Searching...</span>
                        <span className="sm:hidden">Search...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">
                          Search Properties
                        </span>
                        <span className="sm:hidden">Search</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
