"use client";

import { StepperFlow } from "@/app/_shared/types";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function Stepper({
  currentStatus,
  steps,
}: {
  currentStatus: string;
  steps: any;
}) {
  const currentIndex = StepperFlow.findIndex(
    (item) => item.value === currentStatus,
  );

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
        {StepperFlow.map((stf, index) => {
          if (dones.includes(stf.value)) {
            getStepColor = "bg-green-500 text-white";
          } else if (stf.value === currentStatus) {
            getStepColor = "bg-blue-500 text-white";
          } else {
            getStepColor = "bg-gray-200 text-gray-500";
          }

          return (
            <div key={stf.value} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${getStepColor} cursor-default`}
                >
                  {dones.includes(stf.value) ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </button>
                <span className="mt-2 text-xs font-medium text-gray-700">
                  {stf.label}
                </span>
              </div>
              {index < StepperFlow.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${getLineColor(index)}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
