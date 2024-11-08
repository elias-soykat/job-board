"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getToken } from "@/lib/utils";
import axios from "axios";
import { Mail, Plus, Send, Trash2, Users } from "lucide-react";
import React, { useState } from "react";

interface Candidate {
  email: string;
  name: string;
}

export default function JobAlertsPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEmail || !newName) {
      toast({
        title: "Please fill in both name and email",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate email
    if (candidates.some((candidate) => candidate.email === newEmail)) {
      toast({
        title: "This email is already added",
        variant: "destructive",
      });
      return;
    }

    setCandidates([...candidates, { email: newEmail, name: newName }]);
    setNewEmail("");
    setNewName("");
  };

  const handleRemoveCandidate = (email: string) => {
    setCandidates(candidates.filter((candidate) => candidate.email !== email));
  };

  const handleSendAlerts = async (e: React.FormEvent) => {
    e.preventDefault();

    if (candidates.length === 0) {
      toast({
        title: "Please add at least one candidate",
        variant: "destructive",
      });
      return;
    }

    if (!subject || !message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setSending(true);
      const token = getToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/alerts`,
        {
          subject,
          message,
          candidates,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast({ title: "Job alerts sent successfully!" });
        setSubject("");
        setMessage("");
        setCandidates([]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Failed to send alerts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto rounded-md sm:shadow-xl p-4 sm:p-8 max-w-4xl my-3">
      <div className="flex items-center gap-3 mb-8">
        <Mail className="w-6 h-6" />
        <h1 className="text-lg font-bold text-gray-800">Job Alerts Manager</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Candidate List */}
        <div>
          <div className="mb-6">
            <h2 className="flex items-center gap-2 font-semibold mb-4">
              <Users className="w-5 h-5" />
              Recipients
            </h2>

            <form onSubmit={handleAddCandidate} className="space-y-3">
              <input
                type="text"
                placeholder="Candidate Name"
                value={newName}
                required
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button type="submit" className="px-4 py-2 rounded-lg">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {candidates.map((candidate) => (
              <div
                key={candidate.email}
                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{candidate.name}</p>
                  <p className="text-sm text-gray-500">{candidate.email}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => handleRemoveCandidate(candidate.email)}
                  className="p-2 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
            {candidates.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No recipients added yet
              </p>
            )}
          </div>
        </div>

        {/* Right Column - Message Composition */}
        <form onSubmit={handleSendAlerts} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter alert subject"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Message Content
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Compose your job alert message..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <Button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 px-6 py-3"
          >
            <Send className="w-5 h-5" />
            {sending ? "Sending..." : "Send Job Alerts"}
          </Button>
        </form>
      </div>
    </div>
  );
}
