import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

const View = ({ data, stf }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span
        onClick={() => data && setOpen(true)}
        className={clsx(
          "mt-2 text-xs font-medium text-gray-700",
          data && "hover:text-blue-600 cursor-pointer",
        )}
      >
        {stf?.label}
      </span>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-wrap">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Step History</h3>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="w-5 h-5 text-red-500 cursor-pointer" />
              </button>
            </div>
            <hr className="text-blue-100 my-4" />
            <form className="space-y-4">
              <div className="font-semibold">{stf.label}</div>
              <p className="text-sm">{data.notes}</p>
              <p>
                Changed At: {data.changedAt} <br /> Changed By: {data.changedBy}
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default View;
