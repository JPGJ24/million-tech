"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { Property } from "@/interface";

interface OwnerCardProps {
  property: Property;
}

export function OwnerCard({ property }: OwnerCardProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg brand-purple mb-4">
          Property Owner
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <Image
            width={1000}
            height={1000}
            src={property.owner.photo}
            alt={property.owner.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-lg brand-purple">
              {property.owner.name}
            </h4>
            <div className="text-sm text-gray-600">
              <p>{property.owner.email}</p>
              <p>{property.owner.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full brand-primary-bg hover:bg-brand-primary/90 text-white cursor-pointer">
            <Phone className="w-4 h-4 mr-2" />
            {property.owner.phone}
          </Button>

          <Button
            variant="outline"
            className="w-full border-brand-primary text-brand-primary hover:brand-primary-bg cursor-pointer"
          >
            <Mail className="w-4 h-4 mr-2" />
            {property.owner.email}
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t">
          <h5 className="font-semibold text-sm brand-purple mb-2">
            Owner Address
          </h5>
          <p className="text-sm text-gray-600">{property.owner.address}</p>
        </div>
      </CardContent>
    </Card>
  );
}
