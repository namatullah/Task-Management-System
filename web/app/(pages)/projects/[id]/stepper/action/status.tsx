"use client";

import { useActionState, useEffect } from "react";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/context/AuthContext";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";
import { toast } from "sonner";
import { changeStepAction, FormState } from "./action";

export default function Status({ setOpen, data }: any) {
  const { user } = useAuth();
  const initialState: FormState = { message: null, errors: {}, success: false };
  const [state, formAction, isPending] = useActionState(
    changeStepAction,
    initialState,
  );
  useEffect(() => {
    if (!state.success) return;
    toast.success(state.message);
    setOpen(false);
  }, [state]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Move to next Step</h3>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            <XMarkIcon className="w-5 h-5 text-red-500 cursor-pointer" />
          </button>
        </div>
        <hr className="text-blue-100 my-4" />
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={data.projectId} />
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="status" value={data.status} />
          <input type="hidden" name="isForward" value={data.isForward} />
          <input type="hidden" name="isFinal" value={data.isFinal} />
          <p>Are you sure to move to the next step?</p>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              rows={3}
              className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-none"
              aria-describedby="notes-error"
            />
            {state.errors?.notes && (
              <div id="notes-error" aria-live="polite" aria-atomic="true">
                {state.errors?.notes.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <LoadingButton
              type="submit"
              isLoading={isPending}
              loadingText="Moving..."
            >
              Next <ArrowRightIcon className="w-4 h-4 ml-2" />
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}
