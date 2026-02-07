"use server";
import Create from "./actions/create";
import { Suspense } from "react";
import { ProjectTableSkeleton } from "@/app/_ui/shared/skeletons";
import Table from "./table";
import GlobalToast from "@/app/_ui/shared/GlobalToast";

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
      <GlobalToast route="/projects" text="project" />
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
