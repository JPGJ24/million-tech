"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          width={1000}
          height={1000}
          src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
          alt="Modern property"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-muted/90 "></div>
      </div>
      {/*Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Find your ideal home in
            <span className="block text-white">Florida</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Discover unique properties with our interactive map. More than 1,000
            properties for sale and rent in the best locations.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="text-4xl font-bold text-white mb-2">1,200+</div>
            <div className="text-white/80">Available Properties</div>
          </div>
          <div
            className="text-center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-4xl font-bold text-white mb-2">150+</div>
            <div className="text-white/80">Certified Agents</div>
          </div>
          <div
            className="text-center animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-4xl font-bold text-white mb-2">95%</div>
            <div className="text-white/80">Satisfied Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
