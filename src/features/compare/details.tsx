import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { usePriceFormatter } from "@/hooks/usePriceFormatter";
import { Property } from "@/interface";
import { Bed, Bath, Car, Calendar, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface DetailsProps {
  selectedProperties: Property[];
  isHighlighted: (property: Property, field: string) => boolean;
}

export function Details({ selectedProperties, isHighlighted }: DetailsProps) {
  const { formatPrice } = usePriceFormatter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="brand-purple mt-6">Detailed Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-semibold bg-gray-100">
                  Feature
                </th>
                {selectedProperties.map((property) => (
                  <th
                    key={property.idOwner}
                    className="text-center py-3 px-2 font-semibold bg-gray-100 min-w-48"
                  >
                    {property.name.length > 30
                      ? property.name.substring(0, 30) + "..."
                      : property.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {/* Price */}
              <tr>
                <td className="py-3 px-2 font-medium">Price</td>
                {selectedProperties.map((property) => (
                  <td
                    key={property.idOwner}
                    className={`text-center py-3 px-2 ${
                      isHighlighted(property, "price")
                        ? "bg-green-50 font-bold"
                        : ""
                    }`}
                  >
                    {formatPrice(property.price)}
                  </td>
                ))}
              </tr>

              {/* Price per sqm */}
              <tr>
                <td className="py-3 px-2 font-medium">Price per m²</td>
                {selectedProperties.map((property) => (
                  <td
                    key={property.idOwner}
                    className={`text-center py-3 px-2 ${
                      isHighlighted(property, "pricePerSqm")
                        ? "bg-green-50 font-bold"
                        : ""
                    }`}
                  >
                    ${Math.round(property.price / property.details.area)}
                    /m²
                  </td>
                ))}
              </tr>

              {/* Area */}
              <tr>
                <td className="py-3 px-2 font-medium">Área</td>
                {selectedProperties.map((property) => (
                  <td
                    key={property.idOwner}
                    className={`text-center py-3 px-2 ${
                      isHighlighted(property, "area")
                        ? "bg-green-50 font-bold"
                        : ""
                    }`}
                  >
                    {property.details.area} m²
                  </td>
                ))}
              </tr>

              {/* Bedrooms */}
              <tr>
                <td className="py-3 px-2 font-medium">Bedrooms</td>
                {selectedProperties.map((property) => (
                  <td
                    key={property.idOwner}
                    className={`text-center py-3 px-2 ${
                      isHighlighted(property, "bedrooms")
                        ? "bg-green-50 font-bold"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Bed className="w-4 h-4" />
                      {property.details.bedrooms}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Bathrooms */}
              <tr>
                <td className="py-3 px-2 font-medium">Bathrooms</td>
                {selectedProperties.map((property) => (
                  <td
                    key={property.idOwner}
                    className={`text-center py-3 px-2 ${
                      isHighlighted(property, "bathrooms")
                        ? "bg-green-50 font-bold"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Bath className="w-4 h-4" />
                      {property.details.bathrooms}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Parking */}
              <tr>
                <td className="py-3 px-2 font-medium">Parking</td>
                {selectedProperties.map((property) => (
                  <td
                    key={property.idOwner}
                    className={`text-center py-3 px-2 ${
                      isHighlighted(property, "parking")
                        ? "bg-green-50 font-bold"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Car className="w-4 h-4" />
                      {property.details.parking}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Year Built */}
              <tr>
                <td className="py-3 px-2 font-medium">Year of Construction</td>
                {selectedProperties.map((property) => (
                  <td key={property.idOwner} className="text-center py-3 px-2">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {property.details.yearBuilt || "N/A"}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Agent */}
              <tr>
                <td className="py-3 px-2 font-medium">Agent</td>
                {selectedProperties.map((property) => (
                  <td key={property.idOwner} className="text-center py-3 px-2">
                    <div className="flex flex-col items-center gap-1">
                      <Image
                        width={1000}
                        height={1000}
                        src={property.agent.image}
                        alt={property.agent.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium">
                        {property.agent.name}
                      </span>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        {property.agent.rating}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Amenities */}
              <tr>
                <td className="py-3 px-2 font-medium">Amenities</td>
                {selectedProperties.map((property) => (
                  <td key={property.idOwner} className="text-center py-3 px-2">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {property.amenities.slice(0, 3).map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="outline"
                          className="text-xs"
                        >
                          {amenity}
                        </Badge>
                      ))}
                      {property.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{property.amenities.length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
