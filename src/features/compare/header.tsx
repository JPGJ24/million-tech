import { ArrowLeft, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Property } from "@/interface";

interface HeaderProps {
  selectedProperties: Property[];
  setShowSearch: (show: boolean) => void;
}

export function Header({ selectedProperties, setShowSearch }: HeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/properties"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
            <h1 className="text-3xl font-bold brand-purple">
              Property Comparator
            </h1>
            <p className="text-gray-600 mt-2">
              Compare up to 3 properties side by side to make the best decisión
            </p>
          </div>

          {selectedProperties.length < 3 && (
            <Button
              onClick={() => setShowSearch(true)}
              className="brand-primary-bg hover:bg-brand-primary/90 text-white cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
