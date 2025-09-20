"use client";

import { useProperties } from "@/contexts";
import { LoaderSection } from "@/components/ui/loading";
import { ErrorSection } from "@/components/ui/error";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OwnersPage() {
  const { properties, loading, error, getOwners } = useProperties();

  if (loading) {
    return <LoaderSection />;
  }

  if (error) {
    return <ErrorSection error={error} />;
  }

  const owners = getOwners();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold brand-purple mb-4">
              Property Owners
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our property owners and discover their real estate portfolios
            </p>
          </div>
        </div>
      </div>

      {/* Owners Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {owners.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No owners found
            </h3>
            <p className="text-gray-500">
              There are currently no property owners in our database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {owners.map((owner) => {
              const ownerProperties = properties.filter(
                (p) => p.owner?.id === owner.id
              );
              const featuredProperties = ownerProperties.filter(
                (p) => p.featured
              );
              const totalValue = ownerProperties.reduce(
                (sum, p) => sum + p.price,
                0
              );

              return (
                <Card
                  key={owner.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    {/* Owner Photo and Basic Info */}
                    <div className="text-center mb-6">
                      <Image
                        width={1000}
                        height={1000}
                        src={owner.photo}
                        alt={owner.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                      />
                      <h3 className="text-xl font-semibold brand-purple mb-2">
                        {owner.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Member since{" "}
                          {new Date(owner.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{owner.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{owner.email}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <span className="text-gray-700">{owner.address}</span>
                      </div>
                    </div>

                    {/* Property Stats */}
                    <div className="border-t pt-4 mb-6">
                      <h4 className="font-semibold text-sm brand-purple mb-3">
                        Property Portfolio
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-lg text-gray-900">
                            {ownerProperties.length}
                          </div>
                          <div className="text-gray-600">Properties</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg text-gray-900">
                            {featuredProperties.length}
                          </div>
                          <div className="text-gray-600">Featured</div>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <div className="text-sm text-gray-600">
                          Total Portfolio Value
                        </div>
                        <div className="font-semibold text-lg brand-purple">
                          ${totalValue.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Property Types */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm brand-purple mb-2">
                        Property Types
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(
                          new Set(ownerProperties.map((p) => p.propertyType))
                        ).map((type) => (
                          <Badge
                            key={type}
                            variant="outline"
                            className="text-xs border-brand-primary text-brand-primary"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button className="w-full brand-primary-bg hover:bg-brand-primary/90 text-white">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Owner
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-brand-primary text-brand-primary hover:brand-primary-bg"
                        asChild
                      >
                        <Link href={`/owners/${owner.id}`}>
                          View Properties
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
