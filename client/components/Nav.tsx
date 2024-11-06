"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function JobBoardNav({
  user,
}: {
  user?: { name: string; avatar: string };
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <Link href="/jobs" className="text-foreground hover:text-primary">
              Find Jobs
            </Link>
            <Link
              href="/dashboard/jobs/create"
              className="text-foreground hover:text-primary"
            >
              Create a Job
            </Link>
            <Link
              href="/dashboard/jobs/alerts"
              className="text-foreground hover:text-primary"
            >
              Job Alerts
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Image
                      width={200}
                      height={200}
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost">Log in</Button>
                <Button>Sign up</Button>
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
            <Link
              href="/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
            >
              Find Jobs
            </Link>
            <Link
              href="/dashboard/jobs/create"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
            >
              Create a Job
            </Link>
            <Link
              href="/dashboard/jobs/alerts"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
            >
              Job Alerts
            </Link>
          </div>
          <div className="mb-2 pb-4">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Image
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-foreground">
                    {user.name}
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
