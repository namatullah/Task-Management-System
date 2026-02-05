"use client";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpAction } from "../actions";
import clsx from "clsx";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");

    const result = await signUpAction(formData);

    if (result.success) {
      router.push("/signin?registered=true");
    } else {
      setError(result.error || "Sign up failed");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className={clsx(
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none border-gray-300",
                {},
              )}
              placeholder="Full Name"
            />
          </div>

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
                aria-describedby="password-error"
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

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={clsx(
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none border-gray-300",
                {},
              )}
              placeholder="Confirm Password"
              aria-describedby="confirmPassword-error"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="signin" className="text-blue-600 hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
