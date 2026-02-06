"use server";
import { ProjectTableSkeleton } from "@/app/_ui/shared/skeletons";
import UsersTable from "./table";
import { Suspense } from "react";

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
      <div className="flex justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>

      <Suspense fallback={<ProjectTableSkeleton />}>
        <UsersTable query={query} page={page} />
      </Suspense>
    </div>
  );
};

export default Page;
