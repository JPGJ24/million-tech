const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5254";

export async function getProperties() {
  const res = await fetch(`${API_BASE_URL}/api/properties`);
  if (!res.ok) throw new Error("Error getting properties");
  return res.json();
}

export async function searchProperties({
  name,
  minPrice,
  maxPrice,
}: {
  name?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
}) {
  const params = new URLSearchParams();
  if (name) params.append("name", String(name));
  if (minPrice !== undefined) params.append("minPrice", String(minPrice));
  if (maxPrice !== undefined) params.append("maxPrice", String(maxPrice));

  const res = await fetch(`${API_BASE_URL}/api/properties/search?${params}`);
  if (!res.ok) throw new Error("Error searching properties");
  return res.json();
}

export async function getOwners() {
  const res = await fetch(`${API_BASE_URL}/api/owners`);
  if (!res.ok) throw new Error("Error getting owners");
  return res.json();
}
