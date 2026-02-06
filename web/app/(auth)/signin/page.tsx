"use client";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useAuth } from "@/app/context/AuthContext";
import { signInAction, SignInFormState } from "./action";
import { toast } from "sonner";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const initialState: SignInFormState = {
    message: null,
    errors: {},
    success: false,
    data: {
      accessToken: "",
      user: {
        id: "",
        email: "",
      },
    },
  };

  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.data) {
      toast.success(state.message);
      login(state.data.accessToken, state.data.user);
      setShouldRedirect(true);
    }
  }, [state.success, state.data, login]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/dashboard");
    }
  }, [shouldRedirect, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

        {state.message && (
          <div className="mb-4 p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              name="email"
              className={clsx(
                "w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none",
                state.errors?.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500",
              )}
              placeholder="you@example.com"
              aria-describedby="email-error"
            />
            {state.errors?.email && (
              <div id="email-error" className="mt-1 text-xs text-red-500">
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

          <div className="text-right text-sm">
            <button
              type="button"
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => alert("Forgot password flow here")}
            >
              Forgot your password?
            </button>
          </div>

          <LoadingButton
            type="submit"
            isLoading={isPending}
            loadingText="Signing in ..."
            widthFull={true}
          >
            Sign In
          </LoadingButton>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link
            href="/signup"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
