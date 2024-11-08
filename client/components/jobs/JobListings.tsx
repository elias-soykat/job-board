"use client";

import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import JobCard from "./JobCard";

// Type definitions
interface Job {
  _id: string;
  title: string;
  companyName: string;
  description: string[];
  jobType: string;
  status: string;
}

interface PaginationInfo {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs?page=${currentPage}&limit=10`
        );
        setJobs(response.data.data.jobs);
        setPagination(response.data.pagination);
        setError(null);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType))
  );

  const jobTypes = Array.from(new Set(jobs.map((job) => job.jobType)));

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-lg">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:flex min-h-screen bg-gray-100">
      {/* Filters sidebar */}
      <div className="w-64 hidden lg:block bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="space-y-2 ">
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
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-5 bg-gray-0"
            />
          </div>
        </div>

        {/* Job listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (pagination.hasPrevPage) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={`px-4 py-2 rounded-md ${
                      !pagination.hasPrevPage
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:underline"
                    }`}
                  />{" "}
                </PaginationItem>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => (
                    <PaginationItem key={page}>
                      {array[index - 1] + 1 !== page && (
                        <span className="px-4">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    </PaginationItem>
                  ))}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (pagination.hasNextPage) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={`px-4 py-2 rounded-md ${
                      !pagination.hasNextPage
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:underline"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Pagination info */}
            <div className="text-sm text-gray-500 text-center mt-4">
              Showing page {pagination.currentPage} of {pagination.totalPages} (
              {pagination.totalItems} total jobs)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
