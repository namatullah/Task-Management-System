"use client";

import { useActionState, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createProject, State } from "./actions";
import { useAuth } from "@/app/context/AuthContext";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";

export default function Create() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer"
      >
        <PlusIcon className="w-5 h-5 text-blue-600" />
        Add Project
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Project</h3>
              <button
                onClick={() => {
                  state.errors = {};
                  state.message = null;
                  setOpen(false);
                }}
              >
                <XMarkIcon className="w-5 h-5 text-red-500 cursor-pointer" />
              </button>
            </div>
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="ownerId" value={user?.id} />
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project name
                </label>
                <input
                  name="name"
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-none"
                  aria-describedby="name-error"
                />
                <div id="name-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.name &&
                    state.errors.name.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-none"
                  aria-describedby="description-error"
                />
                <div
                  id="description-error"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {state.errors?.description &&
                    state.errors.description.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>

              <div aria-live="polite" aria-atomic="true">
                {state.message && (
                  <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <LoadingButton
                  type="submit"
                  isLoading={isPending}
                  loadingText="Creating..."
                >
                  Create
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
