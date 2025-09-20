"use client";

import Image from "next/image";
import { MapPin, Bed, Bath, Car, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/interface";
import { usePriceFormatter } from "@/hooks/usePriceFormatter";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
  viewMode?: "grid" | "list" | "map";
}

export function PropertyCard({
  property,
  viewMode = "grid",
}: PropertyCardProps) {
  const { formatPrice } = usePriceFormatter();

  const isList = viewMode === "list";

  return (
    <div
      className={`property-card bg-white rounded-xl shadow-sm border overflow-hidden group ${
        isList ? "flex flex-col md:flex-row" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative ${isList ? "md:w-80 flex-shrink-0" : ""}`}>
        <div
          className={`overflow-hidden ${
            isList ? "aspect-[4/3] md:aspect-[3/2]" : "aspect-[4/3]"
          }`}
        >
          <Image
            width={1000}
            height={1000}
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Overlay only in grid */}
        {!isList && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Featured */}
        {property.featured && (
          <Badge className="absolute top-3 left-3 brand-light-purple-bg text-white">
            featured
          </Badge>
        )}

        {/* Sale/Rent */}
        <Badge
          variant="secondary"
          className="absolute bottom-3 left-3 bg-gray-100 backdrop-blur-sm"
        >
          {property.priceType === "sale" ? "sale" : "rent"}
        </Badge>
      </div>

      {/* Content */}
      <div className={`${isList ? "flex-1 p-6" : "p-5"}`}>
        {/* Price */}
        <div className="text-2xl font-bold brand-primary mb-2">
          {formatPrice(property.price)}
        </div>

        {/* Title */}
        <h3
          className={`font-semibold brand-purple mb-2 line-clamp-2 ${
            isList ? "text-xl" : "text-lg"
          }`}
        >
          {property.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.location.zone}, {property.location.city}
          </span>
        </div>

        {/* Description only in list */}
        {isList && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>
        )}

        {/* Details */}
        <div
          className={`text-sm text-gray-600 mb-4 ${
            isList ? "flex gap-6" : "flex gap-4"
          }`}
        >
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.details.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.details.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="w-4 h-4" />
            <span>{property.details.parking}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{property.details.area}m²</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {property.amenities
            .slice(0, isList ? 4 : 3)
            .map((amenity: string) => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
          {property.amenities.length > (isList ? 4 : 3) && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - (isList ? 4 : 3)} more
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div
          className={`flex ${
            isList
              ? "justify-between items-end"
              : "items-center justify-between"
          }`}
        >
          {/* Info of the agent */}
          <div className="flex items-center gap-2">
            <Image
              width={1000}
              height={1000}
              src={property.agent.image}
              alt={property.agent.name}
              className={`${
                isList ? "w-10 h-10" : "w-8 h-8"
              } rounded-full object-cover`}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {property.agent.name}
              </p>
              {isList && (
                <p className="text-xs text-gray-500">
                  ⭐ {property.agent.rating}
                </p>
              )}
            </div>
          </div>

          {/* Button */}
          <Link href={`/property/${property.idOwner}`}>
            <Button
              size={isList ? "default" : "sm"}
              className="brand-primary-bg hover:bg-brand-primary/90 text-white cursor-pointer"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
