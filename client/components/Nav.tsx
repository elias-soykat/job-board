"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getToken } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { LogIn, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface JwtPayload {
  companyName: string | null;
}
interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Find Jobs" },
  { href: "/dashboard/jobs/create", label: "Create a Job" },
  { href: "/dashboard/jobs/alerts", label: "Job Alerts" },
];

export default function JobBoardNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded.companyName);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; secure; samesite=strict";
    setUser(null);
    window.location.href = "/auth/login";
  };

  const isUserLoggedIn = !!user;
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              JobBoard
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isUserLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative border rounded-full bg-gray-200 text-gray-800 font-semibold text-lg h-8 w-8"
                  >
                    {user.charAt(0)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mb-2 pb-4">
            {isUserLoggedIn ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0"></div>
                <div className="ml-3">
                  <div className="text-base font-medium text-foreground">
                    {user.charAt(0)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 px-2 space-y-1">
                <Button className="w-full justify-start" variant="ghost">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </Button>
                <Button className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
