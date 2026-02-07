"use client";

import { useActionState, useState } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { deleteProject } from "./actions";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";

const Delete = ({ project }: { project: any }) => {
  const [open, setOpen] = useState(false);

  const initialState: any = { message: null };
  const updateProjectWithId = deleteProject.bind(null, project.id);
  const [state, formAction, isPending] = useActionState(
    updateProjectWithId,
    initialState,
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer"
      >
        <TrashIcon className="w-5 h-5 text-red-600" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Delete Project</h3>
              <button
                onClick={() => {
                  state.message = null;
                  setOpen(false);
                }}
              >
                <XMarkIcon className="w-5 h-5 text-red-500 cursor-pointer" />
              </button>
            </div>
            <form action={formAction} className="space-y-4">
              <p>
                Are you sure, you want to delete the project{" "}
                <b>{project.name}</b> ?
              </p>
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
      )}
    </>
  );
};
export default Delete;
