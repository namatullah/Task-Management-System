"use client";

import { useActionState, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserType } from "@/app/_shared/types";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";
import { changeStatusAction } from "./action";
import clsx from "clsx";

const ChangeStatus = ({ user }: { user: UserType }) => {
  const [open, setOpen] = useState(false);

  const initialState: { message: string | null } = {
    message: null,
  };
  const changeStatusWithId = changeStatusAction.bind(null, user.id);
  const [state, formAction, isPending] = useActionState(
    changeStatusWithId,
    initialState,
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={clsx(
          `flex items-center gap-2 px-4 py-2 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer`,
          user.isActive ? "text-red-500" : "text-green-500",
        )}
      >
        {user.isActive ? "Deactive" : "Active"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Change User Status</h3>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="w-5 h-5 text-red-500" />
              </button>
            </div>
            <hr className="text-blue-100 my-4" />
            <form action={formAction} className="space-y-4">
              <p className={user.isActive ? "text-red-500" : "text-green-500"}>
                {user.isActive
                  ? `Are you sure to deactive the user: ${user.name}`
                  : `Are you sure to activate the user: ${user.name}`}
              </p>
              <div aria-live="polite" aria-atomic="true">
                {state.message && (
                  <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <LoadingButton
                  type="submit"
                  isLoading={isPending}
                  loadingText={
                    user.isActive ? "Deactivating..." : "Activating..."
                  }
                >
                  {user.isActive ? "Deactive" : "Active"}
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ChangeStatus;
