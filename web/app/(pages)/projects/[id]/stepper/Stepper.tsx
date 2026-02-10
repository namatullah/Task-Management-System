"use client";

import { StepperFlow } from "@/app/_shared/types";
import { CheckIcon } from "@heroicons/react/24/outline";
import View from "./view";

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

  return (
    <div className="w-full">
      {/* MOBILE — Vertical */}
      <div className="flex flex-col gap-4 md:hidden">
        {StepperFlow.map((stf, index) => {
          const isDone = dones.includes(stf.value);
          const isActive = stf.value === currentStatus;
          const thisStep = steps.find((ths: any) => ths.step === stf.value);

          return (
            <div key={stf.value} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
              ${
                isDone
                  ? "bg-green-500 text-white"
                  : isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
              >
                {isDone ? <CheckIcon className="w-4 h-4" /> : index + 1}
              </div>

              <View data={thisStep} stf={stf} />
            </div>
          );
        })}
      </div>

      {/* DESKTOP — Horizontal */}
      <div className="hidden md:flex items-center justify-between">
        {StepperFlow.map((stf, index) => {
          let getStepColor = dones.includes(stf.value)
            ? "bg-green-500 text-white"
            : stf.value === currentStatus
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-500";

          const thisStep = steps.find((ths: any) => ths.step === stf.value);

          return (
            <div key={stf.value} className="flex-1 flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepColor}`}
                >
                  {dones.includes(stf.value) ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                <View data={thisStep} stf={stf} />
              </div>

              {index < StepperFlow.length - 1 && (
                <div className={`flex-1 h-1 mx-2 ${getLineColor(index)}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
