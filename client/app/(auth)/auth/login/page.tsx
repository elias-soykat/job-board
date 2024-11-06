// app/(auth)/auth/login/page.tsx
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isDisabled = !email || !password;

  const formAction = async (formData: FormData) => {
    setError("");
    startTransition(async () => {
      try {
        console.log(`page.tsx:33 formData ==>>`, formData);
        const result = {
          error: "Invalid email or password",
        };

        if (result.error) {
          setError(result.error);
          return;
        }

        // Redirect to dashboard on success
        router.push("/dashboard");
      } catch (err) {
        console.log(`page.tsx:43 err ==>>`, err);
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <Card className="w-[300px] sm:w-[360px] rounded-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full"
            type="submit"
            disabled={isPending || isDisabled}
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
