export interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyAgent {
  name: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  properties: number;
}

export interface PropertyLocation {
  city: string;
  zone: string;
  address: string;
  lat: number;
  lng: number;
}

export interface PropertyDetails {
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  yearBuilt?: number;
}

export interface Property {
  id: string;
  idOwner: string;
  name: string;
  description: string;
  price: number;
  priceType: "sale" | "rent";
  currency: string;
  images: string[];
  location: PropertyLocation;
  details: PropertyDetails;
  amenities: string[];
  propertyType: "apartment" | "house" | "office" | "commercial" | "condo";
  codeInternal?: string;
  year?: number;
  agent: PropertyAgent;
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
  owner: PropertyOwner;
}

export type PropertyType =
  | "apartment"
  | "house"
  | "office"
  | "commercial"
  | "condo";

export type PriceType = "sale" | "rent";

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PropertyComparison {
  propertyIds: string[];
  properties: Property[];
  criteria: string[];
}
