import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const tasks = [
  {
    id: 1,
    title: "Design Landing Page",
    project: "Website Redesign",
    status: "TODO",
  },
  {
    id: 2,
    title: "Setup Database",
    project: "Backend API",
    status: "In Progress",
  },
  { id: 3, title: "Write Docs", project: "Documentation", status: "Done" },
];
const Page = () => {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer">
          <PlusIcon className="w-5 h-5 text-blue-600" />
          Add Task
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-100 text-sm">
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.project}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer">
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer">
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
