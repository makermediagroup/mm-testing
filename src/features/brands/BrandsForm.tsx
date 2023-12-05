import { Link, useNavigate } from "@tanstack/react-router";
import { type FC, type FormEvent } from "react";

interface BrandsFormProps {
  brand?: {
    brandId: number;
    advertiserId: number;
    categoryId: number;
    name: string;
  };
  submitText: string;
  mutation: any;
}

const BrandsForm: FC<BrandsFormProps> = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, category, adversiter } = event.target as HTMLFormElement;

    const data = {
      name: name.value,
      categoryId: Number(category.value),
      advertiserId: Number(adversiter.value),
    };
    props.mutation.mutate(data);
    navigate({ to: "/app/brands" });
  };

  return (
    <div>
      <h1 className="text-3xl mr-auto">{props.submitText} brand</h1>
      <form onSubmit={onSubmit} className="mt-4 bg-white p-4 rounded">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Brand name
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.brand?.name ?? ""}
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
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Brand category
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.brand?.categoryId ?? ""}
                type="text"
                name="category"
                id="category"
                autoComplete="given-name"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="advertiser"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Brand advertiser
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.brand?.advertiserId ?? ""}
                type="text"
                name="adversiter"
                id="advertiser"
                autoComplete="given-name"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="space-x-2 mt-4 flex justify-end items-center">
          <Link
            to="/app/brands"
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

export default BrandsForm;
