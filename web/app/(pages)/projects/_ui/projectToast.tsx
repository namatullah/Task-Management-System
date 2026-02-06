"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProjectsToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toastType = searchParams.get("toast");
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!toastType) return;
    if (hasShownRef.current) return;

    hasShownRef.current = true;

    switch (toastType) {
      case "created":
        toast.success("Project created successfully");
        break;
      case "updated":
        toast.success("Project updated successfully");
        break;
      case "deleted":
        toast.success("Project deleted successfully");
        break;
    }

    router.replace("/projects", { scroll: false });
  }, [toastType, router]);

  return null;
}
