import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

interface State {
  stateId: number;
  name: string;
}

interface StoresFormStateSelectProps {
  defaultValue: number;
}

const StoresFormStateSelect: FC<StoresFormStateSelectProps> = (props) => {
  const statesQuery = useQuery<State[]>({
    queryKey: ["states"],
    queryFn: () =>
      fetch("https://localhost:7243/api/States").then((res) => res.json()),
  });

  if (statesQuery.isFetching) {
    return <p>Loading...</p>;
  }

  if (statesQuery.isError) {
    return <p>Error {statesQuery.error.message}</p>;
  }

  if (!statesQuery.data) {
    return <p>No data</p>;
  }

  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="state"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        State
      </label>
      <div className="mt-2">
        <select
          defaultValue={props.defaultValue}
          id="state"
          name="state"
          autoComplete="state-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="0">Select one</option>
          {statesQuery.data.map((state) => {
            return (
              <option key={state.stateId} value={state.stateId}>
                {state.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default StoresFormStateSelect;
