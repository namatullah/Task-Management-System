"use client";

import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";
import { UserType } from "@/app/_shared/types";
import { deleteMemberAction } from "./action";
import { toast } from "sonner";
interface PropsType {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMember: Dispatch<SetStateAction<UserType | null>>;
  member: UserType | any;
}
const DeleteMember = ({ setOpen, setMember, member }: PropsType) => {
  const initialState: any = { message: null, success: false };
  const updateProjectWithId = deleteMemberAction.bind(null, member?.id);
  const [state, formAction, isPending] = useActionState(
    updateProjectWithId,
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
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-wrap">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Delete Member</h3>
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
        <hr className="text-blue-100 my-4" />
        <form action={formAction} className="space-y-4">
          <div className="flex flex-col w-full">
            <p className="whitespace-normal wrap-break-words w-full text-sm">
              Are you sure, you want to delete the <b>{member.user.name}</b>{" "}
              from this project?
            </p>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                state.message = null;
                setMember(null);
                setOpen(false);
              }}
              className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
            >
              No
            </button>
            <LoadingButton
              type="submit"
              isLoading={isPending}
              loadingText="Deleting..."
            >
              Yes
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DeleteMember;
