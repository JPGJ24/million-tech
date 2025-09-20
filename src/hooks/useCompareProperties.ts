"use client";

import { useState, useMemo } from "react";
import { Property } from "@/interface";
import { useProperties } from "@/contexts";

export function useCompareProperties() {
  const { properties, loading, error } = useProperties();

  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Filter properties by name, zone or city
  const filteredProperties = useMemo(() => {
    return properties.filter(
      (property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.zone
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [properties, searchTerm]);

  // Add property (maximum 3)
  const addProperty = (property: Property) => {
    if (
      selectedProperties.length < 3 &&
      !selectedProperties.find((p) => p.idOwner === property.idOwner)
    ) {
      setSelectedProperties((prev) => [...prev, property]);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  // Remove property
  const removeProperty = (propertyId: string) => {
    setSelectedProperties((prev) =>
      prev.filter((p) => p.idOwner !== propertyId)
    );
  };

  // Get comparison value
  const getComparisonValue = (property: Property, field: string) => {
    switch (field) {
      case "price":
        return property.price;
      case "area":
        return property.details.area;
      case "bedrooms":
        return property.details.bedrooms;
      case "bathrooms":
        return property.details.bathrooms;
      case "parking":
        return property.details.parking;
      case "pricePerSqm":
        return Math.round(property.price / property.details.area);
      default:
        return 0;
    }
  };

  // Get best value of a field
  const getBestValue = (field: string) => {
    if (selectedProperties.length === 0) return null;

    const values = selectedProperties.map((p) => getComparisonValue(p, field));

    if (field === "price" || field === "pricePerSqm") {
      return Math.min(...values);
    } else {
      return Math.max(...values);
    }
  };

  // Check if a value should be highlighted
  const isHighlighted = (property: Property, field: string) => {
    const bestValue = getBestValue(field);
    return (
      bestValue !== null && getComparisonValue(property, field) === bestValue
    );
  };

  return {
    // base data
    properties,
    loading,
    error,

    // comparison state
    selectedProperties,
    filteredProperties,
    searchTerm,
    showSearch,

    // setters
    setSearchTerm,
    setShowSearch,

    // actions
    addProperty,
    removeProperty,
    getComparisonValue,
    getBestValue,
    isHighlighted,
  };
}
