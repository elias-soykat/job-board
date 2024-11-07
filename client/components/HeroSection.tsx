"use client";

import { Briefcase, MapPin, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="sm:text-lg mb-8">
            Discover thousands of job opportunities with all the information you
            need.
          </p>
        </div>

        <div className="mt-10 mb-6 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Briefcase className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Thousands of Jobs</h2>
            <p>Find opportunities in various industries and locations.</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Remote Opportunities</h2>
            <p>Discover flexible work-from-home positions.</p>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Career Growth</h2>
            <p>Find roles that align with your career aspirations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
