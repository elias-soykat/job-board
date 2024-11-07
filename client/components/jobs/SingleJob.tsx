'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Clock, Building, Calendar, Share2 } from 'lucide-react'

// This would typically come from an API or props
const jobData = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp Solutions",
  location: "San Francisco, CA (Remote Option Available)",
  salary: "$120,000 - $160,000",
  type: "Full-time",
  experience: "5+ years",
  postedDate: "2023-11-01",
  description: "We are seeking a talented Senior Frontend Developer to join our innovative team. As a key member of our development team, you will be responsible for creating cutting-edge web applications that push the boundaries of what's possible on the web. You'll work closely with our product and design teams to bring ideas to life, ensuring a seamless and engaging user experience across all our platforms.",
  responsibilities: [
    "Lead the development of complex web applications using React and TypeScript",
    "Collaborate with UX designers to implement responsive and accessible user interfaces",
    "Mentor junior developers and conduct code reviews",
    "Optimize application performance and ensure cross-browser compatibility",
    "Participate in architectural decisions and help define coding standards"
  ],
  requirements: [
    "5+ years of experience in frontend development",
    "Expert knowledge of React, TypeScript, and modern CSS (including Tailwind)",
    "Strong understanding of web performance optimization techniques",
    "Experience with state management solutions (e.g., Redux, MobX, or Recoil)",
    "Familiarity with backend technologies and RESTful APIs",
    "Excellent problem-solving skills and attention to detail"
  ],
  benefits: [
    "Competitive salary and equity package",
    "Health, dental, and vision insurance",
    "401(k) plan with company match",
    "Flexible work hours and remote work options",
    "Professional development budget",
    "Regular team building events and hackathons"
  ],
  tags: ["React", "TypeScript", "Tailwind CSS", "Frontend", "Senior Level"]
}

export default function SingleJob() {
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = () => {
    setIsApplying(true)
    // Implement application logic here
    setTimeout(() => {
      setIsApplying(false)
      alert("Application submitted successfully!")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{jobData.title}</CardTitle>
              <p className="text-xl text-gray-600">{jobData.company}</p>
            </div>
            <Button onClick={handleApply} disabled={isApplying} className="w-full md:w-auto">
              {isApplying ? "Applying..." : "Apply Now"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              {jobData.location}
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-5 h-5 mr-2" />
              {jobData.salary}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              {jobData.type}
            </div>
            <div className="flex items-center text-gray-600">
              <Building className="w-5 h-5 mr-2" />
              {jobData.experience}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              Posted on {new Date(jobData.postedDate).toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {jobData.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700">{jobData.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              {jobData.responsibilities.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2">
              {jobData.requirements.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
            <ul className="list-disc pl-5 space-y-2">
              {jobData.benefits.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button onClick={handleApply} disabled={isApplying} className="w-full sm:w-auto">
              {isApplying ? "Applying..." : "Apply Now"}
            </Button>
            <Button variant="outline" onClick={() => alert("Share functionality to be implemented")} className="w-full sm:w-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}