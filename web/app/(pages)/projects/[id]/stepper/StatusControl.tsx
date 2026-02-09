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
            <LoadingButton
              type="button"
              onClick={() =>
                prevStep?.value &&
                handleStatusChange(prevStep.value, false, false)
              }
              disabled={!prevStep?.value || isUpdating}
              size="sm"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              {prevStep?.label || "N/A"}
            </LoadingButton>

            <span className="text-sm font-medium text-gray-600">
              {curStep.label}
            </span>
            <LoadingButton
              type="button"
              onClick={() =>
                nextStep?.value
                  ? handleStatusChange(nextStep.value, true, false)
                  : handleStatusChange(curStep.value, true, true)
              }
              variant="primary"
              size="sm"
            >
              {curStep?.end ? (
                "Complete?"
              ) : (
                <>
                  {nextStep?.label}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </LoadingButton>
          </>
        ) : (
          <LoadingButton
            type="button"
            onClick={() => handleStatusChange("planned", true, false)}
            variant="primary"
            size="sm"
          >
            Start
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </LoadingButton>
        )}
      </div>

      {curStep?.change_to && (
        <div className="pt-4 border-t">
          <p className="mb-2 text-sm font-medium text-gray-700">Change to:</p>
          <div className="flex flex-wrap gap-2">
            {curStep.change_to?.map((ch: any) => (
              <LoadingButton
                key={ch.value}
                type="button"
                onClick={() => handleStatusChange(ch.value, true, false)}
                isLoading={isUpdating}
                size="sm"
              >
                {ch.label}
              </LoadingButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
