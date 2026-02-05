"use client";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpAction } from "../actions";
import clsx from "clsx";

interface FormState {
  message: string | null;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string[];
  };
  success?: boolean;
}

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const initialState: FormState = {
    message: null,
    errors: {},
    success: false,
  };

  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState,
  );

  if (state.success) {
    router.push("/signin?registered=true");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        {/* {state.errors?.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {state.errors.general.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        {state.message && !state.errors?.general && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
            {state.message}
          </div>
        )} */}
        <form action={formAction} className="space-y-4">
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
              aria-describedby="name-error"
            />
            {state.errors?.name && (
              <div id="name-error" className="mt-1 text-sm text-red-600">
                {state.errors.name.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className={clsx(
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none",
                state.errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500",
              )}
              placeholder="you@example.com"
              aria-describedby="email-error"
            />
            {state.errors?.email && (
              <div id="email-error" className="mt-1 text-sm text-red-600">
                {state.errors.email.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
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
                  "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none ",
                  state.errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500",
                )}
                placeholder="Password"
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

              {state.errors?.password && (
                <div id="password-error" className="mt-1 text-sm text-red-600">
                  {state.errors.password.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
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
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none ",
                state.errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500",
              )}
              placeholder="Confirm Password"
              aria-describedby="confirmPassword-error"
            />

            {state.errors?.confirmPassword && (
              <div
                id="confirmPassword-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.confirmPassword.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
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
