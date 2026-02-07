"use client";

import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserType } from "@/app/_shared/types";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";
import { toast } from "sonner";
import { changeStatusMemberAction, FormState } from "./action";

const ChangeStatus = ({
  setOpen,
  setMember,
  member,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMember: Dispatch<SetStateAction<UserType | null>>;
  member: UserType | any;
}) => {
  const initialState: FormState = { message: null, success: false };
  const changeStatusMemberWithId = changeStatusMemberAction.bind(
    null,
    member?.id,
  );
  const [state, formAction, isPending] = useActionState(
    changeStatusMemberWithId,
    initialState,
  );
  useEffect(() => {
    if (!state.success) return;
    toast.success(state.message);
    state.message = null;
    state.success = false;
    setMember(null);
    setOpen(false);
  }, [state]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Change Status</h3>
          <button
            onClick={() => {
              state.message = null;
              state.success = false;
              setMember(null);
              setOpen(false);
            }}
          >
            <XMarkIcon className="w-5 h-5 text-red-500 cursor-pointer" />
          </button>
        </div>
        <form action={formAction} className="space-y-4">
          <div aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>
          <p className={member.isActive ? "text-red-500" : "text-green-500"}>
            {member.isActive
              ? `Are you sure to deactive the user: ${member.user.name}`
              : `Are you sure to activate the user: ${member.user.name}`}
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <LoadingButton
              type="submit"
              isLoading={isPending}
              loadingText={
                member.isActive ? "Deactivating..." : "Activating..."
              }
            >
              {member.isActive ? "Deactive" : "Active"}
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangeStatus;
