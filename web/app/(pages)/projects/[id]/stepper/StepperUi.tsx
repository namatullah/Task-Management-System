"use client";
import Stepper from "@/app/(pages)/projects/[id]/stepper/Stepper";
import React, { useEffect, useState } from "react";
import StatusControl from "./StatusControl";
import { getStepper, updateProjectStatus } from "@/app/_lib/projects";
import { useAuth } from "@/app/context/AuthContext";

const StepperUi = ({ id }: { id: string }) => {
  const { user } = useAuth();
  const [steps, setSteps] = useState();
  const [status, setStatus] = useState("none");

  const [currentStep, setCurrentStep] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (
    status: string,
    isForward: boolean,
    isFinal: boolean,
  ) => {
    setIsUpdating(true);
    try {
      await updateProjectStatus(id, {
        status: status,
        userId: user?.id,
        notes: "N/A",
        isForward,
        isFinal,
      });
      setStatus(status);
      // Show success toast
    } catch (error) {
      // Show error toast
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const fetchFn = async () => {
      const res = await getStepper(id);
      if (res.length > 0) {
        const curStep =
          res.find((step: any) => step.status === "active") ??
          res.find((step: any) => step.step === "complete") ??
          res.find((step: any) => step.step === "canceled") ??
          null;

        setStatus(curStep?.step);
        setCurrentStep(curStep);
      }
      setSteps(res);
    };

    fetchFn();
  }, [status]);

  if (!steps) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <div className="mb-8"></div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">Project Progress</h2>
        <Stepper currentStatus={status} steps={steps} />
        <hr className="my-4" />
        <StatusControl
          steps={steps}
          currentStatus={status}
          currentStep={currentStep}
          onStatusChange={handleStatusChange}
          isUpdating={isUpdating}
        />
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Status History</h3>
      </div>
    </div>
  );
};

export default StepperUi;
