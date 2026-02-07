const ActionSkeleton = () => {
  return <div className="h-9 w-13 bg-gray-200 rounded"></div>;
};
const SmallActionSkeleton = () => {
  return <div className="h-4 w-6 bg-gray-200 rounded"></div>;
};
const SearchSkeleton = () => {
  return <div className="h-8 max-w-4/12 bg-gray-300 rounded"></div>;
};

const TextSkeleton = () => {
  return <div className="h-4 w-24 bg-gray-300 rounded"></div>;
};

export const ProjectTableSkeleton = () => {
  const rows = Array.from({ length: 8 });
  return (
    <div className="overflow-x-auto w-full bg-white rounded shadow animate-pulse">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th colSpan={3} className="px-6 py-3">
              <SearchSkeleton />
            </th>
          </tr>
          <tr>
            <th className="px-6 py-3">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows.map((_, i) => (
            <tr key={i} className="text-sm">
              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <ActionSkeleton />
                <ActionSkeleton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const UsersTableSkeleton = () => {
  const rows = Array.from({ length: 8 });
  return (
    <div className="overflow-x-auto w-full bg-white rounded shadow animate-pulse">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th colSpan={3} className="px-6 py-3">
              <SearchSkeleton />
            </th>
          </tr>
          <tr>
            <th className="px-6 py-3">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows.map((_, i) => (
            <tr key={i} className="text-sm">
              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <ActionSkeleton />
                <ActionSkeleton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const MemberTableSkeleton = () => {
  const rows = Array.from({ length: 3 });
  return (
    <div className="w-full flex flex-col h-full">
      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200 text-sm">
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap ">
                <div className="flex justify-between">
                  <TextSkeleton />
                  <SmallActionSkeleton />
                </div>
              </td>
            </tr>
            {rows.map((_, i) => (
              <tr className="hover:bg-gray-100" key={i}>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <TextSkeleton />
                    </div>
                    <div className="flex gap-3">
                      <SmallActionSkeleton />
                      <SmallActionSkeleton />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
