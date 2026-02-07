import { getById } from "@/app/_lib/projects";
import Members from "./members/page";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const project = await getById(id);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Board
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap align-top" width="30%">
                <p className="text-xl">{project.name}</p>
                <p className="text-wrap text-sm">{project.description}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" width="30%"></td>
              <td className="px-6 py-4 whitespace-nowrap" width="30%">
                <Members project={project} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
