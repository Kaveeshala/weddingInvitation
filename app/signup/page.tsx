"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [canSignup, setCanSignup] = useState(false);
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_ADMIN_EMAIL || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          router.replace("/dashboard");
          return;
        }

        const signupCheck = await fetch("/api/auth/signup/check", {
          cache: "no-store",
        });

        if (signupCheck.ok) {
          const data = await signupCheck.json();
          setCanSignup(Boolean(data.canSignup));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to sign up");
      }

      router.replace("/dashboard");
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "Failed to sign up.");
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return <div className="p-8">Loading...</div>;
  }

  if (!canSignup) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f5f0] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-[#2f2a24]">
            Admin already created
          </h1>
          <p className="mt-3 text-sm text-[#76685a]">
            Signup is disabled because this dashboard allows only one admin.
          </p>
          <Button className="mt-6 w-full" asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f5f0] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
          Admin Signup
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[#2f2a24]">
          Create admin account
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm outline-none"
          />

          {message ? (
            <p className="text-sm text-red-600">{message}</p>
          ) : null}

          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Creating..." : "Create Admin"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#76685a]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#b08d57] underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}