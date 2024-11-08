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
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    companyName: "",
  });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isDisabled =
    !formData.email ||
    !formData.password ||
    !formData.passwordConfirm ||
    !formData.companyName ||
    formData.password !== formData.passwordConfirm;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        if (formData.password !== formData.passwordConfirm) {
          setError("Passwords do not match");
          return;
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          formData
        );

        if (response.status === 201) {
          router.push(`/auth/send-email?email=${formData.email}`);
        } else {
          setError("An unexpected error occurred");
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError((err as any).response?.data?.message || "An error occurred");
      }
    });
  };

  return (
    <Card className="w-[350px] sm:w-[400px] md:w-[450px] rounded-md">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Create an account for your company</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
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
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
            <Input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm your password"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              required
            />
            {formData.password !== formData.passwordConfirm &&
              formData.passwordConfirm && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full py-5"
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
