import { FC, FormEvent } from "react";
import StoresFormStateSelect from "./StoresFormStatesSelect";
import StoresFormRegionsSelect from "./StoresFormRegionsSelect";
import { Link, useNavigate } from "@tanstack/react-router";

interface StoresFormProps {
  store?: {
    storeId: number;
    name: string;
    location: string;
    stateId: number;
    regionId: number;
  };
  submitText: string;
  mutation: any;
}

const StoresForm: FC<StoresFormProps> = (props) => {
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { name, location, state, region } = event.target as HTMLFormElement;
      const data = {
        name: name.value,
        location: location.value,
        stateId: Number(state.value),
        regionId: Number(region.value),
        storeFormatId: 1,
      };
      console.log(data);
      props.mutation.mutate(data);
      navigate({ to: "/app/stores" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl mr-auto">{props.submitText} store</h1>
      <form onSubmit={onSubmit} className="mt-4 bg-white p-4 rounded">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Store name
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.store?.name ?? ""}
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Store location
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.store?.location ?? ""}
                type="text"
                name="location"
                id="location"
                autoComplete="given-name"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <StoresFormStateSelect defaultValue={props.store?.stateId ?? 0} />
          <StoresFormRegionsSelect defaultValue={props.store?.regionId ?? 0} />
        </div>
        <div className="space-x-2 mt-4 flex justify-end items-center">
          <Link
            to="/app/stores"
            className="text-sm font-semibold leading-6 text-gray-900 text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded bg-gray-300 px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {props.submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoresForm;
