"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmailContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

  return (
    <CardHeader>
      <CardTitle className="text-xl text-center pb-2">
        Verify Your Email
      </CardTitle>
      <CardDescription className="text-md text-center">
        We&apos;ve sent a verification link to{" "}
        <span className="font-bold text-blue-500 mb-4">{emailParam}</span>
        <p className="text-sm mt-2 text-gray-400">
          Please check your email and click the link to verify your account.
        </p>
      </CardDescription>
    </CardHeader>
  );
}

function LoadingState() {
  return (
    <CardHeader>
      <CardTitle className="text-xl text-center pb-2">Loading...</CardTitle>
    </CardHeader>
  );
}

export default function SendEmailPage() {
  return (
    <Card className="w-full max-w-md rounded-md p-5">
      <Suspense fallback={<LoadingState />}>
        <EmailContent />
      </Suspense>
    </Card>
  );
}
