"use server";
import { list } from "@/app/lib/projects";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Update from "./ui/update";

const ProjectTable = async () => {
  const projects = await list();
  return (
    <div className="overflow-x-auto w-full bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
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
              <td className="px-6 py-4 align-top" width="30%">
                {project.name}
              </td>
              <td className="px-6 py-4 align-top" width="40%">
                {project.description}
              </td>
              <td className="px-6 py-4 flex gap-2 align-top">
                <Update project={project} />
                <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer">
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
