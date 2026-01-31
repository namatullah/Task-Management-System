"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  console.log(pathname)

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 shrink-0">
      <input
        className="peer block rounded border border-gray-200  px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-none"
        placeholder={placeholder}
        onChange={({ target }) => handleSearch(target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
