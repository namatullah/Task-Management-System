"use server";
import Create from "./ui/create";
import { Suspense } from "react";
import { ProjectTableSkeleton } from "@/app/ui/shared/skeletons";
import ProjectsToast from "./ui/projectToast";
import Table from "./table";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  return (
    <div className="w-full flex flex-col h-full">
      <ProjectsToast />
      <div className="flex justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Create />
      </div>

      <Suspense fallback={<ProjectTableSkeleton />}>
        <Table query={query} page={page} />
      </Suspense>
    </div>
  );
};

export default Page;
