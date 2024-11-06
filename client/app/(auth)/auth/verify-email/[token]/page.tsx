"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function VerifyEmailPage({ email = "user@example.com" }) {
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    // Simulate email verification process
    const timer = setTimeout(() => {
      setVerificationStatus(Math.random() > 0.5 ? "success" : "error");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleResendVerification = () => {
    setResendDisabled(true);
    setResendCountdown(60);

    // Simulate resending verification email
    setTimeout(() => {
      setResendDisabled(false);
    }, 60000);

    const countdownInterval = setInterval(() => {
      setResendCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md rounded-md p-1">
      <CardHeader>
        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        <CardDescription>
          We&apos;ve sent a verification link to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {verificationStatus === "loading" && (
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        )}
        {verificationStatus === "success" && (
          <CheckCircle className="h-16 w-16 text-green-500" />
        )}
        {verificationStatus === "error" && (
          <XCircle className="h-16 w-16 text-red-500" />
        )}
        <p className="text-center">
          {verificationStatus === "loading" && "Verifying your email..."}
          {verificationStatus === "success" &&
            "Your email has been successfully verified!"}
          {verificationStatus === "error" &&
            "There was an error verifying your email. Please try again."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={handleResendVerification}
          disabled={resendDisabled || verificationStatus === "loading"}
        >
          {resendDisabled
            ? `Resend in ${resendCountdown}s`
            : "Resend Verification Email"}
        </Button>
      </CardFooter>
    </Card>
  );
}
