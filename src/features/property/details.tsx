import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Property } from "@/interface";
import { usePriceFormatter } from "@/hooks/usePriceFormatter";
import { Bed, Bath, Car, Maximize, Calendar } from "lucide-react";

interface DetailsProps {
  property: Property;
}

export function Details({ property }: DetailsProps) {
  const { formatPrice } = usePriceFormatter();
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              className={
                property.featured
                  ? "brand-light-purple-bg text-white"
                  : "brand-primary-bg text-white"
              }
            >
              {property.priceType === "sale" ? "Sale" : "Rent"}
            </Badge>
            {property.featured && (
              <Badge
                variant="outline"
                className="border-brand-light-purple text-brand-light-purple"
              >
                Featured
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold brand-purple mb-2">
            {property.name}
          </h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span>
              {property.location.address}, {property.location.zone},{" "}
              {property.location.city}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary mb-1">
            {formatPrice(property.price)}
          </div>
          <div className="text-sm text-gray-500 font-roboto-mono">
            {formatPrice(Math.round(property.price / property.details.area))}
            /m²
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <Bed className="w-6 h-6 brand-primary mx-auto mb-2" />
          <div className="font-semibold text-lg">
            {property.details.bedrooms}
          </div>
          <div className="text-sm text-gray-600">Bedrooms</div>
        </div>
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <Bath className="w-6 h-6 brand-primary mx-auto mb-2" />
          <div className="font-semibold text-lg">
            {property.details.bathrooms}
          </div>
          <div className="text-sm text-gray-600">Bathrooms</div>
        </div>
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <Car className="w-6 h-6 brand-primary mx-auto mb-2" />
          <div className="font-semibold text-lg">
            {property.details.parking}
          </div>
          <div className="text-sm text-gray-600">Parking</div>
        </div>
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <Maximize className="w-6 h-6 brand-primary mx-auto mb-2" />
          <div className="font-semibold text-lg">{property.details.area}</div>
          <div className="text-sm text-gray-600">m²</div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold brand-purple mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold brand-purple mb-4">Amenities</h2>
        <div className="flex flex-wrap gap-2">
          {property.amenities.map((amenity) => (
            <Badge
              key={amenity}
              variant="outline"
              className="border-brand-primary text-brand-primary"
            >
              {amenity}
            </Badge>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      {property.details.yearBuilt && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold brand-purple mb-4">
            Additional Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">
                Year of construction: {property.details.yearBuilt}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
