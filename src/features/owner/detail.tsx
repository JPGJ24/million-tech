import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Property, PropertyOwner } from "@/interface";

interface DetailProps {
  owner: PropertyOwner;
  ownerProperties: Property[];
}

export function Detail({ owner, ownerProperties }: DetailProps) {
  return (
    <div className="lg:col-span-1">
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg brand-purple mb-4">
            Owner Details
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">
                Full Name
              </h4>
              <p className="text-gray-900">{owner.name}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">
                Email
              </h4>
              <p className="text-gray-900">{owner.email}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">
                Phone
              </h4>
              <p className="text-gray-900">{owner.phone}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">
                Address
              </h4>
              <p className="text-gray-900">{owner.address}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">
                Birthday
              </h4>
              <p className="text-gray-900">
                {new Date(owner.birthday).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Summary */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg brand-purple mb-4">
            Portfolio Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Properties</span>
              <span className="font-semibold">{ownerProperties.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Featured Properties</span>
              <span className="font-semibold">
                {ownerProperties.filter((p) => p.featured).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">For Sale</span>
              <span className="font-semibold">
                {ownerProperties.filter((p) => p.priceType === "sale").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">For Rent</span>
              <span className="font-semibold">
                {ownerProperties.filter((p) => p.priceType === "rent").length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
