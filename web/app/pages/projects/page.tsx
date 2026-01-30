"use server";
import { list } from "@/app/lib/projects";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Create from "./ui/create";
import ProjectTable from "./ProjectTable";
import { Suspense } from "react";
import { ProjectTableSkeleton } from "@/app/ui/skeletons";

const Page = async () => {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Create />
      </div>
      <Suspense fallback={<ProjectTableSkeleton />}>
        <ProjectTable />
      </Suspense>
    </div>
  );
};

export default Page;
