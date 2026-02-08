"use client";

import { ProjectStatus, STATUS_FLOW } from "@/app/_shared/types";
import { CheckIcon } from "@heroicons/react/24/outline";

interface StepperProps {
  currentStatus: ProjectStatus;
}

export default function Stepper({
  currentStatus,
  steps,
}: {
  currentStatus: string;
  steps: any;
}) {
  const currentIndex = STATUS_FLOW.indexOf(currentStatus);

  // const getStepColor = (index: number) => {
  //   if (index < currentIndex) return "bg-green-500 text-white";
  //   if (index === currentIndex) return "bg-blue-500 text-white";
  //   return "bg-gray-200 text-gray-500";
  // };

  const getLineColor = (index: number) => {
    if (index < currentIndex) return "bg-green-500";
    return "bg-gray-300";
  };

  const dones = steps
    .filter((step: any) => step.status === "done")
    .map((step: any) => step.step);
  let getStepColor;
  return (
    <div className="w-full">
      <div className="hidden md:flex items-center justify-between">
        {STATUS_FLOW.map((status, index) => {
          if (dones.includes(status)) {
            getStepColor = "bg-green-500 text-white";
          } else if (status === currentStatus) {
            getStepColor = "bg-blue-500 text-white";
          } else {
            getStepColor = "bg-gray-200 text-gray-500";
          }

          return (
            <div key={status} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${getStepColor} cursor-default`}
                >
                  {index < currentIndex ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </button>
                <span className="mt-2 text-xs font-medium text-gray-700">
                  {status}
                </span>
              </div>
              {index < STATUS_FLOW.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${getLineColor(index)}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
