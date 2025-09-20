"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Phone, Mail, Star, MessageSquare } from "lucide-react";
import { Property } from "@/interface";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AgentCardProps {
  property: Property;
}

export function AgentCard({ property }: AgentCardProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  return (
    <Card className="mb-6 sticky top-32">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg brand-purple mb-4">
          Real Estate Agent
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <Image
            width={1000}
            height={1000}
            src={property.agent.image}
            alt={property.agent.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-lg brand-purple">
              {property.agent.name}
            </h4>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{property.agent.rating}</span>
              <span>•</span>
              <span>{property.agent.properties} properties</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full brand-primary-bg hover:bg-brand-primary/90 text-white cursor-pointer">
            <Phone className="w-4 h-4 mr-2" />
            {property.agent.phone}
          </Button>

          <Button
            variant="outline"
            className="w-full border-brand-primary text-brand-primary hover:brand-primary-bg  cursor-pointer"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>

          <Button
            variant="outline"
            className="w-full border-brand-primary text-brand-primary hover:brand-primary-bg cursor-pointer"
            onClick={() => setShowContactForm(!showContactForm)}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Agent
          </Button>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div className="mt-6 pt-6 border-t animate-slide-up">
            <h4 className="font-semibold brand-purple mb-4">Send Message</h4>
            <div className="space-y-4">
              <Input placeholder="Your name" />
              <Input placeholder="Tu email" type="email" />
              <Input placeholder="Your phone" type="tel" />
              <Textarea placeholder="Your message..." rows={3} />
              <Button className="w-full brand-primary-bg hover:bg-brand-primary/90 text-white cursor-pointer">
                Send Message
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
