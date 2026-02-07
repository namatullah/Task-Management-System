"use server";
import { TrashIcon } from "@heroicons/react/24/outline";
import AddMember from "./add/add";
import { ProjectType } from "@/app/_shared/types";

const Members = async ({ project }: { project: ProjectType }) => {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200 text-sm">
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap ">
                <div className="flex justify-between">
                  <p className="font-semibold">Members</p>
                  <AddMember projectId={project.id} />
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap ">
                <div className="flex justify-between">
                  <p>Namatullah Shahbazi</p>
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap ">
                <div className="flex justify-between">
                  <p>Nuyan Shahbazi</p>
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
