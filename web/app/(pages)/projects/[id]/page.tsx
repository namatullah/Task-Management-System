import { getById } from "@/app/_lib/projects";
import Members from "./members/page";
import StepperUi from "./stepper/StepperUi";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const project = await getById(id);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap align-top" width="70%">
                <StepperUi id={id} />
                <hr className="text-blue-100 my-4" />
                <p className="text-xl">{project.name}</p>
                <p className="text-wrap text-sm">{project.description}</p>
                <p>
                  Changed At: {project.createdAt} <br /> Changed By:
                  {project.ownerId}
                </p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap align-top" width="30%">
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
