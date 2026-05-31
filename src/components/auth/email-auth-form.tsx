"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { authClient } from "~/lib/auth-client";

export function EmailAuthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({
      email: form.get("email") as string,
      password: form.get("password") as string,
    });
    if (error) {
      setError(error.message ?? "Invalid email or password");
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signUp.email({
      email: form.get("email") as string,
      password: form.get("password") as string,
      name: form.get("name") as string,
    });
    if (error) {
      setError(error.message ?? "Could not create account");
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value="signin">
        <form onSubmit={handleSignIn} className="grid gap-4 pt-2">
          <div className="grid gap-1.5">
            <Label htmlFor="signin-email">Email</Label>
            <Input id="signin-email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="signin-password">Password</Label>
            <Input id="signin-password" name="password" type="password" required placeholder="••••••••" />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="signup">
        <form onSubmit={handleSignUp} className="grid gap-4 pt-2">
          <div className="grid gap-1.5">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input id="signup-name" name="name" type="text" required placeholder="Jane Doe" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" name="password" type="password" required placeholder="••••••••" minLength={8} />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating account…" : "Create Account"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
