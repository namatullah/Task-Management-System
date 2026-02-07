"use server";
import { list } from "@/app/_lib/projects";
import Update from "./actions/update";
import Delete from "./actions/delete";
import Search from "../../_ui/shared/search";
import Pagination from "@/app/_ui/shared/pagination";
import { PAGINATION } from "@/app/_shared/helper";
import Link from "next/link";

const Table = async ({ query, page }: { query: string; page: number }) => {
  const { projects, total_page } = await list(
    query,
    page,
    PAGINATION.ITEMS_PER_PAGE,
  );
  return (
    <div className="overflow-x-auto w-full bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              colSpan={3}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <Search placeholder="Search projects..." />
            </th>
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {projects.map((project: any) => (
            <tr key={project.id} className="hover:bg-gray-100 text-sm">
              <td className="px-6 py-2 align-top" width="30%">
                {project.name}
              </td>
              <td className="px-6 py-2 align-top" width="40%">
                {project.description}
              </td>
              <td className="px-6 py-2 flex gap-2 align-top">
                <Link href={`/projects/${project.id}`}>view</Link>

                <Update project={project} />
                <Delete project={project} />
              </td>
            </tr>
          ))}
          <tr className="hover:bg-gray-100 text-sm">
            <td className="px-6 py-4 align-top text-center" colSpan={3}>
              <Pagination totalPages={total_page} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
