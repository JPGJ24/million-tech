"use client";

import Link from "next/link";
import { use } from "react";
import { useProperties } from "@/contexts";
import { LoaderSection } from "@/components/ui/loading";
import { ErrorSection } from "@/components/ui/error";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PropertiesList } from "@/features/owner/properties-list";
import { Detail } from "@/features/owner/detail";

export default function OwnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { loading, error, getOwnerById, getPropertiesByOwner } =
    useProperties();

  if (loading) {
    return <LoaderSection />;
  }

  if (error) {
    return <ErrorSection error={error} />;
  }

  const owner = getOwnerById(id);
  if (!owner) {
    return notFound();
  }

  const ownerProperties = getPropertiesByOwner(id);
  const totalValue = ownerProperties.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = totalValue / ownerProperties.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/owners"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Owners
          </Link>
        </div>
      </div>

      {/* Owner Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Owner Photo */}
            <div className="flex-shrink-0">
              <Image
                width={200}
                height={200}
                src={owner.photo}
                alt={owner.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>

            {/* Owner Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold brand-purple mb-4">
                {owner.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Member since{" "}
                    {new Date(owner.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>{ownerProperties.length} Properties</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button className="brand-primary-bg hover:bg-brand-primary/90 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  {owner.phone}
                </Button>
                <Button
                  variant="outline"
                  className="border-brand-primary text-brand-primary hover:brand-primary-bg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {owner.email}
                </Button>
              </div>
            </div>

            {/* Portfolio Stats */}
            <div className="flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold brand-purple mb-1">
                  ${totalValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Total Portfolio Value
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Avg: ${Math.round(averagePrice).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Owner Details Card */}
          <Detail owner={owner} ownerProperties={ownerProperties} />

          {/* Properties List */}
          <PropertiesList
            ownerProperties={ownerProperties}
            totalValue={totalValue}
          />
        </div>
      </div>
    </div>
  );
}
