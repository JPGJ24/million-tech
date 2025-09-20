"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Property, PropertyOwner } from "@/interface";
import { getProperties } from "@/services/api";
import {
  searchProperties,
  PropertySearchFilters,
} from "@/services/propertyService";

interface PropertiesContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getPropertyById: (id: string) => Property | undefined;
  getFeaturedProperties: () => Property[];
  getPropertiesByType: (type: "sale" | "rent" | "all") => Property[];
  groupPropertiesByAgent: (
    properties: Property[]
  ) => Record<string, { agent: Property["agent"] }>;
  getOwners: () => PropertyOwner[];
  getPropertiesByOwner: (ownerId: string) => Property[];
  getOwnerById: (ownerId: string) => PropertyOwner | undefined;
  getSearchProperties: (filters: PropertySearchFilters) => Promise<Property[]>;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(
  undefined
);

interface PropertiesProviderProps {
  children: ReactNode;
}

export function PropertiesProvider({ children }: PropertiesProviderProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const featuredProperties = await getProperties();
      setProperties(featuredProperties.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error fetching properties"
      );
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const getPropertyById = (id: string): Property | undefined => {
    return properties.find((property) => property.idOwner === id);
  };

  const getFeaturedProperties = (): Property[] => {
    return properties.filter((property) => property.featured);
  };

  const getPropertiesByType = (type: "sale" | "rent" | "all"): Property[] => {
    if (type === "all") return properties;
    return properties.filter((property) => property.priceType === type);
  };

  const groupPropertiesByAgent = (properties: Property[]) => {
    return properties.reduce((acc, property) => {
      if (!property.agent) return acc;

      const agentId = property.agent.email;

      if (!acc[agentId]) {
        acc[agentId] = {
          agent: property.agent,
        };
      }
      acc[agentId].agent.properties++;

      return acc;
    }, {} as Record<string, { agent: Property["agent"] }>);
  };

  const getOwners = (): PropertyOwner[] => {
    const uniqueOwners = new Map<string, PropertyOwner>();

    properties.forEach((property) => {
      if (property.owner) {
        uniqueOwners.set(property.owner.id, property.owner);
      }
    });

    return Array.from(uniqueOwners.values());
  };

  const getPropertiesByOwner = (ownerId: string): Property[] => {
    return properties.filter((property) => property.owner?.id === ownerId);
  };

  const getOwnerById = (ownerId: string): PropertyOwner | undefined => {
    const property = properties.find((p) => p.owner?.id === ownerId);
    return property?.owner;
  };

  const getSearchProperties = (
    filters: PropertySearchFilters
  ): Promise<Property[]> => {
    return searchProperties(filters);
  };

  const value: PropertiesContextType = {
    properties,
    loading,
    error,
    refetch: fetchProperties,
    getPropertyById,
    getFeaturedProperties,
    getPropertiesByType,
    groupPropertiesByAgent,
    getOwners,
    getPropertiesByOwner,
    getOwnerById,
    getSearchProperties,
  };

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertiesProvider");
  }
  return context;
}
