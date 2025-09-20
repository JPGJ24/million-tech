"use client";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { Property } from "@/interface";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface GalleryProps {
  property: Property;
}
export function Gallery({ property }: GalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };
  return (
    <div className="relative mb-8">
      <div className="aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={property.images[currentImageIndex]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Image Navigation */}
      {property.images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
