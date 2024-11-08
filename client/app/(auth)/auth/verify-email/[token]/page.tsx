"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { ArrowRight, CheckCircle, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";
type Props = {
  params: { token: string };
};

export default function VerifyEmailPage({ params: { token } }: Props) {
  const [verificationStatus, setVerificationStatus] =
    useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus("error");
        setErrorMessage("No verification token found");
        return;
      }

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${token}`
        );

        if (data.status === "success") {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
          setErrorMessage(data.message || "Verification failed");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setVerificationStatus("error");
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred during verification"
        );
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <Card className="w-full max-w-md rounded-md p-1">
      <CardHeader>
        <CardTitle className="text-xl text-center">Verify Your Email</CardTitle>
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
          {verificationStatus === "error" && errorMessage}
        </p>
        <CardFooter className="flex flex-col items-center gap-2">
          {verificationStatus === "success" && (
            <Link href="/auth/login">
              <Button className="w-full">
                Redirect to Login <ArrowRight className="ml-2" />
              </Button>
            </Link>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
