"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useAuth } from "@/app/context/AuthContext";
import { signInAction } from "../actions";

const SignIn = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");

    const result = await signInAction(formData);

    if (result.success) {
      login(result.data.accessToken, result.data.user);
      router.push("/dashboard");
    } else {
      setError(result.error || "Sign in failed");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className={clsx(
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none border-gray-300",
                {},
              )}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={clsx(
                  "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none border-gray-300",
                  {},
                )}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="text-right text-sm">
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => alert("Forgot password flow here")}
            >
              Forgot your password?
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="signup" className="text-blue-600 hover:underline">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
