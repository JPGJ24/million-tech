import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Property } from "@/interface";
import Image from "next/image";
import { usePriceFormatter } from "@/hooks/usePriceFormatter";

interface SearchModalProps {
  filteredProperties: Property[];
  selectedProperties: Property[];
  addProperty: (property: Property) => void;
  setShowSearch: (show: boolean) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export function SearchModal({
  filteredProperties,
  selectedProperties,
  addProperty,
  setShowSearch,
  searchTerm,
  setSearchTerm,
}: SearchModalProps) {
  const { formatPrice } = usePriceFormatter();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden pb-6">
        <CardHeader className="flex flex-row items-center justify-between mt-3">
          <CardTitle>Search Properties</CardTitle>
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by title, zone or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredProperties
              .filter(
                (p) =>
                  !selectedProperties.find((sp) => sp.idOwner === p.idOwner)
              )
              .map((property) => (
                <div
                  key={property.idOwner}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => addProperty(property)}
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={property.images[0]}
                    alt={property.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm line-clamp-1">
                      {property.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {property.location.zone}
                    </p>
                    <p className="text-sm font-bold brand-primary">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-brand-primary" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
