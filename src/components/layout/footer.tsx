"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

const Footter = () => {
  return (
    <footer className="bg-gradient-to-br from-primary to-muted text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo className="h-10 w-auto" />
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Your trusted real estate marketplace in Florida. We connect
              buyers, sellers, and landlords with the best properties in the
              country.
            </p>
            <div className="flex space-x-4">
              <a
                target="_blank"
                href="https://www.facebook.com/milllionluxury"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                href="https://x.com/milllionluxury"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/milllionluxury/"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCmnVS7FdjhQM8Xqg3WRFO3A"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/owners"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Owners
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Compare
                </Link>
              </li>
              <li>
                <Link
                  href="/agents"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Agents
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Property Sales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Property Rental
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Real Estate Consulting
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Property Valuation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Property Management
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80">
                    Miami, Florida
                    <br />
                    Florida, USA
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <p className="text-white/80">+1 2345-6789</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <p className="text-white/80">info@million.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2025 MILLION. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Terms and Conditions
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footter;
