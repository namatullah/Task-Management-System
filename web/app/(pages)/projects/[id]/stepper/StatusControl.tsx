"use client";

import { StepperFlow } from "@/app/_shared/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Status from "./action/status";

interface StatusControlProps {
  projectId: string;
  steps: any;
  currentStatus: string;
  currentStep: any;
  setLoad: any;
}

export default function StatusControl({
  projectId,
  steps,
  currentStatus,
  currentStep,
  setLoad,
}: StatusControlProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) return;
    setLoad(true);
  }, [open]);
  const currentIndex = StepperFlow.findIndex(
    (item) => item.value === currentStatus,
  );
  const isFirst = currentIndex === 0;
  const isLast = [4, 5].includes(currentIndex);
  const final =
    ["complete", "canceled"].includes(currentStep?.step) &&
    currentStep.status === "done"
      ? true
      : false;

  const curStep = StepperFlow[currentIndex];
  const nextStep = isLast ? null : StepperFlow[currentIndex + 1];

  const prevStep = isFirst ? null : StepperFlow[currentIndex - 1];

  let lastDone: any;
  if (currentStatus === "canceled") {
    const { step } = steps.findLast((step: any) => step.status !== "active");
    lastDone = StepperFlow.find((stf) => stf.value === step);
  }
  const [data, setData] = useState({
    projectId: "",
    status: "",
    isForward: false,
    isFinal: false,
  });
  const handleStatusChange = async (
    status: string,
    isForward: boolean,
    isFinal: boolean,
  ) => {
    setData({
      projectId: projectId,
      status: status,
      isForward: isForward,
      isFinal: isFinal,
    });

    setOpen(true);
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
    <>
      {open && <Status setOpen={setOpen} data={data} />}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
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
              <div className="flex flex-wrap gap-2">
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

                {curStep?.change_to &&
                  curStep.change_to?.map((ch: any) => (
                    <button
                      onClick={() => handleStatusChange(ch.value, true, false)}
                      className="btn btn-red"
                    >
                      Cancel
                    </button>
                  ))}
              </div>
            </>
          ) : (
            <button
              onClick={() => handleStatusChange("planned", true, false)}
              className="btn btn-blue flex items-center justify-center"
            >
              Start <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
