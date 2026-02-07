"use client";

import { useActionState, useEffect, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserType } from "@/app/_shared/types";
import { getUsers } from "@/app/_lib/users";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";
import { addMemberAction, FormState } from "./action";
import clsx from "clsx";

const AddMember = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UserType[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setUsers(res);
    };
    fetchUsers();
  }, []);

  const initialState: FormState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    addMemberAction,
    initialState,
  );
  return (
    <>
      <PlusIcon
        className="w-5 h-5 text-blue-600 cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Member</h3>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="w-5 h-5 text-red-500 cursor-pointer" />
              </button>
            </div>
            <form action={formAction} className="space-y-4">
              <div aria-live="polite" aria-atomic="true">
                {state.message && (
                  <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}
              </div>
              <input type="hidden" name="projectId" value={projectId} />
              <div>
                <label className="block text-sm font-medium mb-1">
                  select users
                </label>
                <select
                  name="user"
                  className={clsx(
                    "w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-none bg-white appearance-none",
                    state.errors?.user
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500",
                  )}
                >
                  <option value="">Select a user</option>
                  {users?.map((usr: UserType) => (
                    <option key={usr.id} value={usr.id}>
                      {usr.name}
                    </option>
                  ))}
                </select>
                {state.errors?.user && (
                  <div
                    id="password-error"
                    className="mt-1 text-xs text-red-500"
                  >
                    {state.errors.user.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  name="isAdmin"
                  type="checkbox"
                  value="on"
                  className="w-4 h-4 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-none"
                />
                <label htmlFor="is-admin" className="text-sm font-medium">
                  Project admin?
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <LoadingButton
                  type="submit"
                  isLoading={isPending}
                  loadingText="Adding..."
                >
                  Add
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AddMember;
