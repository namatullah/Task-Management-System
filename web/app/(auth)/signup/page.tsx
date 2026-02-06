"use client";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { signUpAction, SignUpFormState } from "./action";
import { toast } from "sonner";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";

const SignUp = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const initialState: SignUpFormState = {
    message: null,
    errors: {},
    success: false,
  };
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
      router.push("/signin");
    }
  }, [state.success, state.message, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        {state.message && (
          <div className="mb-4 p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className={clsx(
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none border-gray-300",
                state.errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500",
              )}
              placeholder="Full Name"
              aria-describedby="name-error"
            />
            {state.errors?.name && (
              <div id="name-error" className="mt-1 text-xs text-red-500">
                {state.errors.name.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              name="email"
              className={clsx(
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none",
                state.errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500",
              )}
              placeholder="you@example.com"
              aria-describedby="email-error"
            />
            {state.errors?.email && (
              <div id="email-error" className="mt-1 text-xs text-red-500">
                {Array.isArray(state.errors.email) ? (
                  state.errors.email.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))
                ) : (
                  <p>{state.errors.email}</p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={clsx(
                  "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none",
                  state.errors?.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500",
                )}
                placeholder="Password"
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm hover:text-gray-700 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {state.errors?.password && (
              <div id="password-error" className="mt-1 text-xs text-red-500">
                {state.errors.password.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={clsx(
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none",
                state.errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500",
              )}
              placeholder="Confirm Password"
              aria-describedby="confirmPassword-error"
            />

            {state.errors?.confirmPassword && (
              <div id="password-error" className="mt-1 text-xs text-red-500">
                {state.errors.confirmPassword.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              If you are admin provide token
            </label>
            <input
              type="text"
              name="adminToken"
              className={
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none border-gray-300"
              }
              placeholder="Admin Token"
            />
          </div>

          <LoadingButton
            type="submit"
            isLoading={isPending}
            loadingText="Creating account..."
            widthFull={true}
          >
            Sign Up
          </LoadingButton>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
