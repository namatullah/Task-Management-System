"use client";

import { useActionState, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { changeRoleAction } from "./action";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";

const ChangeRole = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role);

  const initialState: { message: string | null } = {
    message: null,
  };
  const changeRoleWithId = changeRoleAction.bind(null, user.id);
  const [state, formAction, isPending] = useActionState(
    changeRoleWithId,
    initialState,
  );

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer"
      >
        Change Role
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User Role Change</h3>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="w-5 h-5 text-red-500" />
              </button>
            </div>
            <hr />
            <form action={formAction} className="space-y-4 mt-4">
              <p>
                Changing the role of user <b>{user.name}</b>
              </p>
              <div aria-live="polite" aria-atomic="true">
                {state.message && (
                  <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="ADMIN"
                        checked={selectedRole === "ADMIN"}
                        onChange={handleRoleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-400 border-gray-300"
                      />
                      <span className="text-sm">Admin</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="USER"
                        checked={selectedRole === "USER"}
                        onChange={handleRoleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-400 border-gray-300"
                      />
                      <span className="text-sm">User</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                {/* <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Change
                </button> */}

                <LoadingButton
                  type="submit"
                  isLoading={isPending}
                  loadingText="Changing role..."
                >
                  Changes
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ChangeRole;
