"use server";
import { UsersTableSkeleton } from "@/app/_ui/shared/skeletons";
import UsersTable from "./table/table";
import { Suspense } from "react";
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
      <GlobalToast route="/users" text="user" />
      <div className="flex justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>

      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable query={query} page={page} />
      </Suspense>
    </div>
  );
};

export default Page;
