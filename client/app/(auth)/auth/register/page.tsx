// app/(auth)/auth/register/page.tsx
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isDisabled =
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    !formData.companyName ||
    formData.password !== formData.confirmPassword;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formAction = async (formData: FormData) => {
    setError("");
    startTransition(async () => {
      try {
        // Validate passwords match
        if (formData.get("password") !== formData.get("confirmPassword")) {
          setError("Passwords do not match");
          return;
        }

        console.log("Registration form data:", Object.fromEntries(formData));

        // TODO: Replace with actual API call
        const result = {
          error: "Registration service not implemented yet",
        };

        if (result.error) {
          setError(result.error);
          return;
        }

        // Redirect to email verification page on success
        router.push("/auth/verify-email");
      } catch (err) {
        console.error("Registration error:", err);
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <Card className="w-[350px] sm:w-[380px] rounded-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Create an account for your company</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {formData.password !== formData.confirmPassword &&
              formData.confirmPassword && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full"
            type="submit"
            disabled={isPending || isDisabled}
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
