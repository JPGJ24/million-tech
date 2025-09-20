import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Property } from "@/interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
  removeProperty: (idOwner: string) => void;
}

export function PropertyCard({ property, removeProperty }: PropertyCardProps) {
  return (
    <Card key={property.idOwner} className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
        onClick={() => removeProperty(property.idOwner)}
      >
        <X className="w-4 h-4" />
      </Button>

      <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
        <Image
          width={1000}
          height={1000}
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
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

          <h3 className="font-bold text-lg brand-purple line-clamp-2 mb-2">
            {property.name}
          </h3>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {property.location.zone}, {property.location.city}
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link href={`/property/${property.idOwner}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-brand-primary text-brand-primary hover:brand-primary-bg cursor-pointer"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
