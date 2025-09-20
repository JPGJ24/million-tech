"use client";

import { use } from "react";
import { useProperties } from "@/contexts";
import PropertyDetailClient from "./property-detail-client";
import { notFound } from "next/navigation";
import { LoaderSection } from "@/components/ui/loading";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { properties, loading } = useProperties();

  if (loading) {
    return <LoaderSection />;
  }

  const property = properties.find((p) => p.idOwner === id);

  if (!property) return notFound();

  return <PropertyDetailClient property={property} />;
}
