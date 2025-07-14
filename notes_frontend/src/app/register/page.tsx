"use client";
import { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    // TODO: Send to backend register endpoint
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    setLoading(false);
    if (response.ok) {
      router.push("/login?registered=true");
    } else {
      setError("Failed to register.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4 w-full max-w-sm border" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold text-primary mb-2">Register</h2>
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
          {loading ? "Registering..." : "Register"}
        </Button>
        <div className="text-xs mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-accent underline">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
}
