"use client";

import { StepperFlow } from "@/app/_shared/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";

interface StatusControlProps {
  steps: any;
  currentStatus: string;
  currentStep: any;
  onStatusChange: (
    status: string,
    isForward: boolean,
    isFinal: boolean,
  ) => Promise<void>;
  isUpdating?: boolean;
}

export default function StatusControl({
  steps,
  currentStatus,
  currentStep,
  onStatusChange,
  isUpdating = false,
}: StatusControlProps) {
  const currentIndex = StepperFlow.findIndex(
    (item) => item.value === currentStatus,
  );
  const isFirst = currentIndex === 0;
  const isLast = [5, 6].includes(currentIndex);
  const final =
    ["complete", "canceled"].includes(currentStep?.step) &&
    currentStep.status === "done"
      ? true
      : false;

  const curStep = StepperFlow[currentIndex];
  const nextStep = isLast
    ? null
    : StepperFlow[currentIndex == 2 ? currentIndex + 2 : currentIndex + 1];

  const prevStep = isFirst ? null : StepperFlow[currentIndex - 1];

  const handleStatusChange = async (
    status: string,
    isForward: boolean,
    isFinal: boolean,
  ) => {
    await onStatusChange(status, isForward, isFinal);
  };
  let lastDone: any;
  if (currentStatus === "canceled") {
    const { step } = steps.findLast((step: any) => step.status !== "active");
    lastDone = StepperFlow.find((stf) => stf.value === step);
  }

  if (final) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <CheckIcon className="w-5 h-5 text-green-500" />
          <span className="font-medium text-gray-700">
            Project is {currentStatus.toLowerCase()}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 pt-2">
        {steps?.length > 0 ? (
          <>
            <button
              onClick={() =>
                currentStatus === "canceled"
                  ? handleStatusChange(lastDone.value, false, false)
                  : prevStep?.value &&
                    handleStatusChange(prevStep.value, false, false)
              }
              className="btn btn-blue flex items-center justify-center"
              disabled={prevStep === null}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              {currentStatus === "canceled"
                ? lastDone.label
                : prevStep?.label || "Not Started"}
            </button>

            <span className="text-sm font-medium text-blue-600">
              {curStep.label}
            </span>

            <button
              onClick={() =>
                nextStep?.value
                  ? handleStatusChange(nextStep.value, true, false)
                  : handleStatusChange(curStep.value, true, true)
              }
              className="btn btn-blue flex items-center justify-center"
            >
              {curStep?.end ? (
                currentStatus === "complete" ? (
                  "Complete"
                ) : (
                  "Canceled"
                )
              ) : (
                <>
                  {nextStep?.label}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </>
        ) : (
          <button
            onClick={() => handleStatusChange("planned", true, false)}
            className="btn btn-blue"
          >
            Start <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
      <hr className="text-blue-100 my-4" />

      {curStep?.change_to && (
        <div className="justify-end flex">
          {curStep.change_to?.map((ch: any) => (
            <button
              onClick={() => handleStatusChange(ch.value, true, false)}
              className="btn btn-red"
            >
              Cancel
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
