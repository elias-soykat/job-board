import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

type Job = {
  title: string;
  companyName: string;
  jobType: string;
  _id: string | number;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="sm:text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.companyName}</p>
          </div>
          <div>
            <Link href={`/jobs/${job._id}`}>
              <Button>Apply Now</Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            New York, NY
          </div>
          <div className="hidden py-2 sm:flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            $90,000 - $140,000
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {job.jobType}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["React", "TypeScript", "Tailwind CSS"].map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
