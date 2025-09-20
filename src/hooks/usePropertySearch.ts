"use client";

import { useState } from "react";
import { Property } from "@/interface";
import { PropertySearchFilters } from "@/services/propertyService";
import { useProperties } from "@/contexts";

interface SearchFormData {
  name: string;
  address: string;
  minPrice: string;
  maxPrice: string;
}

export function usePropertySearch(
  onResultsChange?: (properties: Property[]) => void
) {
  const { getSearchProperties } = useProperties();

  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState<SearchFormData>({
    name: "",
    address: "",
    minPrice: "",
    maxPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof SearchFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const filters: PropertySearchFilters = {
        name: formData.name.trim() || undefined,
        address: formData.address.trim() || undefined,
        minPrice: formData.minPrice ? Number(formData.minPrice) : undefined,
        maxPrice: formData.maxPrice ? Number(formData.maxPrice) : undefined,
      };

      const results = await getSearchProperties(filters);
      onResultsChange?.(results);
      setShowFilters(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error searching properties"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    showFilters,
    setShowFilters,
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
  };
}
