"use client";

import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserType } from "@/app/_shared/types";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";
import { toast } from "sonner";
import { editMemberAction, FormState } from "./action";

const EditMember = ({
  setOpen,
  setMember,
  member,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMember: Dispatch<SetStateAction<UserType | null>>;
  member: UserType | any;
}) => {
  const [check, setCheck] = useState(member.isAdmin);
  const initialState: FormState = { message: null, success: false };
  const updateMemberWithId = editMemberAction.bind(null, member?.id);
  const [state, formAction, isPending] = useActionState(
    updateMemberWithId,
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
          <h3 className="text-lg font-semibold">Edit Member</h3>
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
          <div className="flex items-center gap-2">
            <input
              name="isAdmin"
              type="checkbox"
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
              className="w-4 h-4 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-none cursor-pointer"
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
  );
};
export default EditMember;
