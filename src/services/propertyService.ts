import { Property } from "@/interface";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5254";

export interface PropertySearchFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function searchProperties(
  filters: PropertySearchFilters
): Promise<Property[]> {
  try {
    const queryParams = new URLSearchParams();

    if (filters.name) {
      queryParams.append("name", filters.name);
    }

    if (filters.address) {
      queryParams.append("address", filters.address);
    }

    if (filters.minPrice !== undefined) {
      queryParams.append("minPrice", filters.minPrice.toString());
    }

    if (filters.maxPrice !== undefined) {
      queryParams.append("maxPrice", filters.maxPrice.toString());
    }

    const url = `${API_BASE_URL}/api/Properties/search?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Search error: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error("Error searching for properties:", error);
    throw new Error("Could not load properties. Please try again.");
  }
}
