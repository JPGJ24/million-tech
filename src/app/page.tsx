import React from "react";
import HeroSection from "@/components/sections/hero-section";
import FeaturedProperties from "@/components/sections/featured-properties";
import InteractiveMap from "@/components/sections/interactive-map";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <InteractiveMap />
    </div>
  );
}
