import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

interface Region {
  regionId: number;
  name: string;
  description: string;
}

interface StoresFormRegionsSelectProps {
  defaultValue: number;
}

const StoresFormRegionsSelect: FC<StoresFormRegionsSelectProps> = (props) => {
  const regionsQuery = useQuery<Region[]>({
    queryKey: ["regions"],
    queryFn: () =>
      fetch("https://localhost:7243/api/Regions").then((res) => res.json()),
  });

  if (regionsQuery.isFetching) {
    return <p>Loading...</p>;
  }

  if (regionsQuery.isError) {
    return <p>Error {regionsQuery.error.message}</p>;
  }

  if (!regionsQuery.data) {
    return <p>no data</p>;
  }

  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="region"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Region
      </label>
      <div className="mt-2">
        <select
          defaultValue={props.defaultValue}
          id="region"
          name="region"
          autoComplete="region-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="0">Select one</option>
          {regionsQuery.data.map((region) => {
            return (
              <option key={region.regionId} value={region.regionId}>
                {region.name} - {region.description}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default StoresFormRegionsSelect;
