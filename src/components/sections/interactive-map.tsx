"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Maximize2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePriceFormatter } from "@/hooks/usePriceFormatter";
import { useProperties } from "@/contexts";

const InteractiveMap = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [mapView, setMapView] = useState<"map" | "satellite">("map");
  const { formatPrice } = usePriceFormatter();
  const { properties } = useProperties();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold brand-purple mb-4">
            Explore with Our Interactive Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover properties in real time. Visualize locations, prices and
            features directly on the map of Florida.
          </p>
        </div>

        <div className="relative rounded-lg overflow-hidden">
          {/* Real Map Background */}
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
              alt="Real Map View"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setMapView(mapView === "map" ? "satellite" : "map")
              }
              className="bg-white shadow-lg hover:bg-gray-50"
            >
              <Layers className="w-4 h-4 mr-2" />
              {mapView === "map" ? "Satélite" : "Mapa"}
            </Button>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white shadow-lg hover:bg-gray-50"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Mock Map Container */}
          <div className="map-container h-[600px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <h3 className="text-2xl font-bold mb-2 opacity-30 text-white">
                  Interactive Map
                </h3>
                <p className="opacity-20 text-white">
                  View of Florida with available properties
                </p>
              </div>
            </div>

            {/* Property Markers */}
            <div className="absolute inset-0">
              {properties?.slice(0, 6).map((property, index) => (
                <div
                  key={property.idOwner}
                  className={`absolute cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                    selectedProperty === property.idOwner
                      ? "scale-110 z-20"
                      : "z-10"
                  }`}
                  style={{
                    left: `${20 + index * 12}%`,
                    top: `${30 + (index % 3) * 20}%`,
                  }}
                  onClick={() =>
                    setSelectedProperty(
                      selectedProperty === property.idOwner
                        ? null
                        : property.idOwner
                    )
                  }
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-primary">
                      <MapPin className="w-6 h-6" />
                    </div>

                    {selectedProperty === property.idOwner && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white rounded-lg shadow-xl p-4 border animate-slide-up">
                        <div className="flex gap-3">
                          <Image
                            width={1000}
                            height={1000}
                            src={property.images[0]}
                            alt={property.name}
                            className="w-20 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm brand-purple line-clamp-1">
                              {property.name}
                            </h4>
                            <p className="text-xs text-gray-500 mb-1">
                              {property.location.zone}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-bold brand-primary">
                                {formatPrice(property.price)}
                                <span className="text-xs text-gray-500 font-normal">
                                  {property.priceType === "rent" &&
                                  !formatPrice(property.price).includes("/mes")
                                    ? "/mes"
                                    : ""}
                                </span>
                              </span>
                              <div className="flex gap-1">
                                <Badge variant="secondary" className="text-xs">
                                  {property.details.bedrooms}h
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {property.details.bathrooms}b
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default InteractiveMap;
