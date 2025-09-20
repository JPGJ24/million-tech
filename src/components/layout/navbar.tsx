"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 w-full justify-center ">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive("/")
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`font-medium transition-colors ${
                isActive("/properties")
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Properties
            </Link>
            <Link
              href="/owners"
              className={`font-medium transition-colors ${
                isActive("/owners")
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Owners
            </Link>
            <Link
              href="/compare"
              className={`font-medium transition-colors ${
                isActive("/compare")
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Compare
            </Link>
            <Link
              href="/agents"
              className={`font-medium transition-colors ${
                isActive("/agents")
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Agents
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 cursor-pointer"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 font-medium ${
                  isActive("/")
                    ? "text-primary bg-brand-light"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Home
              </Link>
              <Link
                href="/properties"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 font-medium ${
                  isActive("/properties")
                    ? "text-primary bg-brand-light"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Properties
              </Link>
              <Link
                href="/owners"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 font-medium ${
                  isActive("/owners")
                    ? "text-primary bg-brand-light"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Owners
              </Link>
              <Link
                href="/compare"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 font-medium ${
                  isActive("/compare")
                    ? "text-primary bg-brand-light"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Compare
              </Link>
              <Link
                href="/agents"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 font-medium ${
                  isActive("/agents")
                    ? "text-primary bg-brand-light"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Agents
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
