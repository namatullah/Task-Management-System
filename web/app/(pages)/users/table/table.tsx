import { list } from "@/app/_lib/users";
import { PAGINATION } from "@/app/_shared/helper";
import Pagination from "@/app/_ui/shared/pagination";
import Search from "../../../_ui/shared/search";
import ChangeRole from "../actions/role/change-role";
import ChangeStatus from "../actions/status/change-status";
import Content from "./content";

const UsersTable = async ({ query, page }: { query: string; page: number }) => {
  const { users, total_users } = await list(
    query,
    page,
    PAGINATION.ITEMS_PER_PAGE,
  );

  const total_page = Math.ceil((total_users - 1) / PAGINATION.ITEMS_PER_PAGE);
  const startIndex = (page - 1) * PAGINATION.ITEMS_PER_PAGE;
  return (
    <div className="overflow-x-auto w-full bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              colSpan={5}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <Search placeholder="Search users..." />
            </th>
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <Content users={users} startIndex={startIndex} />
          <tr className="hover:bg-gray-100 text-sm">
            <td className="px-6 py-4 align-top text-center" colSpan={5}>
              <Pagination totalPages={total_page} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
