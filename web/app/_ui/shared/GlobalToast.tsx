"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface ToastProps {
  route: string;
  text: string;
  customMessages?: {
    created?: string;
    updated?: string;
    deleted?: string;
    [key: string]: string | undefined;
  };
}

export default function GlobalToast({
  route,
  text,
  customMessages,
}: ToastProps) {
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
        toast.success(
          customMessages?.created || `${text} created successfully`,
        );
        break;
      case "updated":
        toast.success(
          customMessages?.updated || `${text} updated successfully`,
        );
        break;
      case "deleted":
        toast.success(
          customMessages?.deleted || `${text} deleted successfully`,
        );
        break;
      case "change_role":
        toast.success(
          customMessages?.change_role || `${text} role changed successfully`,
        );
        break;
      case "change_status":
        toast.success(
          customMessages?.change_status ||
            `${text} status changed successfully`,
        );
        break;
      default:
        if (customMessages && customMessages[toastType]) {
          toast.success(customMessages[toastType]);
        } else {
          toast.success(`Action completed successfully`);
        }
    }

    router.replace(route, { scroll: false });
  }, [toastType, router, route, text, customMessages]);

  return null;
}
