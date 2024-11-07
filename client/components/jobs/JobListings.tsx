"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import JobCard from "./JobCard";

const jobData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$80,000 - $120,000",
    type: "Full-time",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    location: "New York, NY",
    salary: "$70,000 - $100,000",
    type: "Contract",
    tags: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Remote",
    salary: "$90,000 - $140,000",
    type: "Full-time",
    tags: ["Node.js", "PostgreSQL", "AWS"],
  },
  // Add more job data as needed
];

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const filteredJobs = jobData.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type))
  );

  const jobTypes = Array.from(new Set(jobData.map((job) => job.type)));

  return (
    <div className="container mx-auto flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          <h3 className="font-medium">Job Type</h3>
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={type}
                checked={selectedJobTypes.includes(type)}
                onCheckedChange={(checked) => {
                  setSelectedJobTypes(
                    checked
                      ? [...selectedJobTypes, type]
                      : selectedJobTypes.filter((t) => t !== type)
                  );
                }}
              />
              <label htmlFor={type} className="ml-2 text-sm">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        <div className="mb-6">
          <div className="relative w-full sm:w-1/2">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-5 bg-gray-0"
            />
          </div>
        </div>
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
