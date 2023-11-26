import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function SearchBar() {
  const router = useRouter();

  const routeQuery = router.query.q;

  const [searchQuery, setSearchQuery] = useState(
    routeQuery ? decodeURIComponent(routeQuery as string) : ""
  );

  return (
    <div className="flex items-center relative group">
      <label
        htmlFor="search-box"
        className="inline-flex w-fit absolute left-2 pointer-events-none rounded-md p-1 text-primary"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5" />
      </label>

      <input
        id="search-box"
        type="text"
        placeholder="Search for Links"
        value={searchQuery}
        onChange={(e) => {
          e.target.value.includes("%") &&
            toast.error("The search query should not contain '%'.");
          setSearchQuery(e.target.value.replace("%", ""));
        }}
        onKeyDown={(e) =>
          e.key === "Enter" &&
          router.push("/search?q=" + encodeURIComponent(searchQuery))
        }
        className="border border-neutral-content bg-base-200 focus:border-primary rounded-md pl-10 py-2 pr-2 w-44 sm:w-60 md:focus:w-80 duration-100 outline-none"
      />
    </div>
  );
}
