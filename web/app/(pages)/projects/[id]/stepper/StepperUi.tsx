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

  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      await updateProjectStatus(id, {
        status: newStatus,
        userId: user?.id,
        notes: "N/A",
      });
      setStatus(newStatus);
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
        const { step } = res.find((step: any) => step.status === "active") ?? 'Complete';
        setStatus(step);
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
        <h2 className="mb-4 text-lg font-semibold">Project Status</h2>
        <Stepper currentStatus={status} steps = {steps} />
        <hr className="my-4" />
        <StatusControl
          steps={steps}
          currentStatus={status}
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
