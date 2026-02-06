"use client";
import { useAuth } from "@/app/context/AuthContext";
import ChangeRole from "../_ui/role/change-role";
import ChangeStatus from "../_ui/status/change-status";
import { UserType } from "@/app/_shared/types";

interface PropsType {
  users: UserType[];
  startIndex: number;
}
const Content = ({ users, startIndex }: PropsType) => {
  const { user } = useAuth();
  return (
    <>
      {users
        .filter((u: UserType) => u.id !== user?.id)
        .map((user: UserType, index: number) => (
          <tr key={user.id} className="hover:bg-gray-100 text-sm">
            <td className="px-6 py-2 align-top">{startIndex + index + 1}</td>
            <td className="px-6 py-2 align-top">{user.name}</td>
            <td className="px-6 py-2 align-top">{user.email}</td>
            <td className="px-6 py-2 align-top">{user.role}</td>
            <td className="px-6 py-2 flex gap-2 align-top">
              <ChangeRole user={user} />
              <ChangeStatus user={user} />
            </td>
          </tr>
        ))}
    </>
  );
};

export default Content;
