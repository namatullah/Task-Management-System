"use client";
import { links } from "@/app/_shared/types";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-55 bg-white shadow-lg flex flex-col z-20">
      <div className="h-16 flex items-center justify-start font-bold text-xl border-b border-gray-100">
        <Squares2X2Icon className="w-5 h-5 ml-6 mr-3" /> TMS
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 p-2 rounded hover:bg-gray-100",
                { "bg-sky-100 text-blue-600": pathname === link.href },
              )}
            >
              <LinkIcon className="w-5 h-5" /> {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
