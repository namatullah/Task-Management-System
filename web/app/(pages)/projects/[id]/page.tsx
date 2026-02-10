import { getById } from "@/app/_lib/projects";
import Members from "./members/page";
import StepperUi from "./stepper/StepperUi";
import { DateHelper } from "@/app/_shared/helper";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const project = await getById(id);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-gray-50">
              <td className="px-6 py-4 align-top w-[70%]">
                <StepperUi id={id} />

                <hr className="my-4 border-blue-100" />

                <h3 className="text-xl font-semibold text-gray-900">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">
                      Changed At
                    </span>
                    <p className="text-gray-900">
                      {DateHelper(project.createdAt)}
                    </p>
                  </div>

                  <div>
                    <span className="font-medium text-gray-500">
                      Changed By
                    </span>
                    <p className="text-gray-900">{project.owner.name}</p>
                  </div>
                </div>
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
