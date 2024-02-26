import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Searchbar() {
  return (
    <form className="relative flex flex-1" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-400"
        aria-hidden="true"
      />
      <input
        id="search-field"
        className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:leading-6 "
        placeholder="Search..."
        type="search"
        name="search"
      />
    </form>
  );
}
