import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

type Job = {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string[];
  id: string | number;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
          </div>
          <Button>
            <Link href={`/dashboard/jobs/${job.id}`}>Apply Now</Link>
          </Button>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {job.salary}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {job.type}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
