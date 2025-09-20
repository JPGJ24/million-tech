"use client";

import Image from "next/image";
import { Users, Phone, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProperties } from "@/contexts";
import { LoaderSection } from "@/components/ui/loading";

export default function AgentesPage() {
  const { groupPropertiesByAgent, properties, loading } = useProperties();

  const featuredAgents = groupPropertiesByAgent(properties);

  if (loading) {
    return <LoaderSection />;
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      {/* Featured Agents Section */}
      <section className="py-16 brand-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold brand-purple mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of expert agents will guide you through every step of
              your buying, selling or renting process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(featuredAgents).map((data) => (
              <Card
                key={data.agent.email}
                className="text-center hover:shadow-xl transition-all duration-300 property-card"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Image
                      width={1000}
                      height={1000}
                      src={data.agent.image}
                      alt={data.agent.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold brand-purple mb-1">
                      {data.agent.name}
                    </h3>

                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{data.agent.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                    <Users className="w-4 h-4" />
                    <span>{data.agent.properties} properties sold</span>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full brand-primary-bg hover:bg-brand-primary/90 text-white cursor-pointer">
                      <Phone className="w-4 h-4 mr-2" />
                      {data.agent.phone}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-brand-primary text-brand-primary cursor-pointer"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
