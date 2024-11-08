"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  description: string[];
  jobType: string;
  status: string;
  createdAt: string;
  responsibilities?: string[];
}

export default function SingleJob() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`
        );
        setJob(response.data.data.job);
        setError(null);
      } catch (err) {
        setError("Failed to fetch job details. Please try again later.");
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const handleApply = async () => {
    try {
      setIsApplying(true);
      toast({ title: "Application submitted successfully!" });
    } catch (err) {
      toast({
        title: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting application:", err);
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-lg">Loading job details...</div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-lg text-red-500">{error || "Job not found"}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <Link className="flex items-center mb-4" href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {job.title}
              </CardTitle>
              <p className="text-xl text-gray-600">{job.companyName}</p>
            </div>
            <Badge
              variant={job.status === "active" ? "default" : "secondary"}
              className="text-sm"
            >
              {job.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              {job.jobType}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </div>

          <section className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed break-words">
              {job.description}
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              {[
                "5+ years of experience in frontend development",
                "Expert knowledge of React, TypeScript, and modern CSS (including Tailwind)",
                "Strong understanding of web performance optimization techniques",
                "Experience with state management solutions (e.g., Redux, MobX, or Recoil)",
                "Familiarity with backend technologies and RESTful APIs",
                "Excellent problem-solving skills and attention to detail",
              ].map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
            <ul className="list-disc pl-5 space-y-2">
              {[
                "Competitive salary and equity package",
                "Health, dental, and vision insurance",
                "401(k) plan with companyName match",
                "Flexible work hours and remote work options",
                "Professional development budget",
                "Regular team building events and hackathons",
              ].map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              onClick={handleApply}
              disabled={isApplying || job.status !== "active"}
              className="w-full sm:w-auto"
            >
              {isApplying
                ? "Applying..."
                : job.status === "active"
                ? "Apply Now"
                : "Position Closed"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied to clipboard!" });
              }}
              className="w-full sm:w-auto"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
