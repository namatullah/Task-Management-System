"use client";

import {
  ProjectStatus,
  STATUS_FLOW,
  STATUS_TRANSITIONS,
} from "@/app/_shared/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { LoadingButton } from "@/app/_ui/shared/LoadingButton";
import { useState } from "react";

interface StatusControlProps {
  steps: any;
  currentStatus: string;
  onStatusChange: (newStatus: string) => Promise<void>;
  isUpdating?: boolean;
}

export default function StatusControl({
  steps,
  currentStatus,
  onStatusChange,
  isUpdating = false,
}: StatusControlProps) {
  const [final, setFinal] = useState(false);

  const currentIndex = STATUS_FLOW.indexOf(currentStatus);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === STATUS_FLOW.length - 1;
  const isFinalState =
    currentStatus === "Complete" || currentStatus === "Canceled";

  // Get allowed next statuses
  // const allowedNextStatuses = STATUS_TRANSITIONS[currentStatus] || [];

  // For simpler flow: next and previous in sequence

  const nextStatus = isLast
    ? null
    : STATUS_FLOW[currentIndex == 2 ? currentIndex + 2 : currentIndex + 1];

  const prevStatus = isFirst ? null : STATUS_FLOW[currentIndex - 1];

  const handleStatusChange = async (status: ProjectStatus) => {
    if (["Complete", "Canceled"].includes(currentStatus)) {
      setFinal(true);
    } else {
      setFinal(false);
    }
    await onStatusChange(status);
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
              onClick={() => prevStatus && handleStatusChange(prevStatus)}
              disabled={!prevStatus || isUpdating}
              size="sm"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Previous: {prevStatus || "N/A"}
            </LoadingButton>

            <span className="text-sm font-medium text-gray-600">
              {currentStatus}
            </span>
            <LoadingButton
              type="button"
              onClick={() => nextStatus && handleStatusChange(nextStatus)}
              disabled={!nextStatus || isUpdating}
              variant="primary"
              size="sm"
            >
              {isFinalState ? (
                <p>complete</p>
              ) : (
                <p>
                  Next: {nextStatus || "N/A"}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </p>
              )}
            </LoadingButton>
          </>
        ) : (
          <LoadingButton
            type="button"
            onClick={() => handleStatusChange("Planned")}
            variant="primary"
            size="sm"
          >
            Start
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </LoadingButton>
        )}
      </div>

      {/* All Available Statuses */}
      {/* <div className="pt-4 border-t">
        <p className="mb-2 text-sm font-medium text-gray-700">Change to:</p>
        <div className="flex flex-wrap gap-2">
          {allowedNextStatuses.map((status: any) => (
            <LoadingButton
              key={status}
              type="button"
              onClick={() => handleStatusChange(status)}
              isLoading={isUpdating}
              size="sm"
            >
              {status}
            </LoadingButton>
          ))}
        </div>
      </div> */}
    </div>
  );
}
