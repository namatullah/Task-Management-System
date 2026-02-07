"use client";
import {
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import AddMember from "./actions/add/add";
import { ProjectType, UserType } from "@/app/_shared/types";
import { getMembers } from "@/app/_lib/project_member";
import { useEffect, useState } from "react";
import { MemberTableSkeleton } from "@/app/_ui/shared/skeletons";
import InfoContent from "@/app/_ui/shared/InfoContent";
import DeleteMember from "./actions/delete/delete";
import EditMember from "./actions/edit/edit";
import ChangeStatus from "./actions/status/status";
import clsx from "clsx";

const Members = ({ project }: { project: ProjectType }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [member, setMember] = useState<UserType | null>(null);

  const [members, setMembers] = useState<UserType | any>();
  const [users, setUsers] = useState<UserType | any>();

  useEffect(() => {
    if (open || openDelete || openEdit || openStatus) return;

    const fetch = async () => {
      const { availabelUsers, members } = await getMembers(project.id);
      setUsers(availabelUsers);
      setMembers(members);
    };
    fetch();
  }, [open, openDelete, openEdit, openStatus]);

  if (!members) {
    return <MemberTableSkeleton />;
  }
  return (
    <>
      {open && (
        <AddMember setOpen={setOpen} projectId={project.id} users={users} />
      )}
      {openDelete && (
        <DeleteMember
          setOpen={setOpenDelete}
          setMember={setMember}
          member={member}
        />
      )}
      {openEdit && (
        <EditMember
          setOpen={setOpenEdit}
          setMember={setMember}
          member={member}
        />
      )}

      {openStatus && (
        <ChangeStatus
          setOpen={setOpenStatus}
          setMember={setMember}
          member={member}
        />
      )}
      <div className="w-full flex flex-col h-full">
        <div className="overflow-x-auto w-full bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200 text-sm">
              <tr className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="flex justify-between">
                    <p className="font-semibold">Members</p>
                    <PlusIcon
                      className="w-5 h-5 text-blue-600 cursor-pointer"
                      onClick={() => setOpen(true)}
                    />
                  </div>
                </td>
              </tr>
              {members?.length > 0 ? (
                members?.map((member: any) => (
                  <tr className="hover:bg-gray-100" key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <p>{member.user.name}</p>
                          {member.isAdmin && (
                            <p className="text-blue-500">Admin</p>
                          )}
                        </div>
                        <div className="flex gap-3">
                          {member.isActive && (
                            <PencilSquareIcon
                              className="w-5 h-5 text-blue-600 cursor-pointer"
                              onClick={() => {
                                setMember(member);
                                setOpenEdit(true);
                              }}
                            />
                          )}
                          <CheckIcon
                            className={clsx(
                              "w-5 h-5 cursor-pointer",
                              member.isActive
                                ? "text-purple-600"
                                : "text-gray-200",
                            )}
                            onClick={() => {
                              setMember(member);
                              setOpenStatus(true);
                            }}
                          />
                          {member.isActive && (
                            <TrashIcon
                              className="w-5 h-5 text-red-600 cursor-pointer"
                              onClick={() => {
                                setMember(member);
                                setOpenDelete(true);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <InfoContent text="Members is not selected" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Members;
