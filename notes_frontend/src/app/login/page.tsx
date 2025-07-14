"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    setLoading(false);
    if (response?.ok) {
      router.push("/notes");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4 w-full max-w-sm border" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-primary mb-2">Login</h2>
        <label className="flex flex-col gap-1">
          Email
          <input name="email" type="email" className="border rounded px-3 py-2" autoFocus required />
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input name="password" type="password" className="border rounded px-3 py-2" required />
        </label>
        {error && <div className="text-red-600">{error}</div>}
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        <div className="text-xs mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-accent underline">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
