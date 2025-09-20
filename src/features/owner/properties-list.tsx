import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { Home } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { PropertyCard } from "@/components/ui/property-card";
import { Property } from "@/interface";

interface PropertiesListProps {
  ownerProperties: Property[];
  totalValue: number;
}

export function PropertiesList({
  ownerProperties,
  totalValue,
}: PropertiesListProps) {
  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold brand-purple">
          Properties ({ownerProperties.length})
        </h2>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="border-brand-primary text-brand-primary"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Total Value: ${totalValue.toLocaleString()}
          </Badge>
        </div>
      </div>

      {ownerProperties.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Properties Found
            </h3>
            <p className="text-gray-500">
              This owner doesn&apos;t have any properties listed yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ownerProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
