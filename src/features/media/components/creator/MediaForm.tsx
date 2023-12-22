import { Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, type FC } from "react";

interface Media {
  mediaId: number;
  mediaCategoryId: number;
  name: string;
  description: string;
  cost: number;
  price: number;
  minimumUnits: number;
  isByBlocks: boolean;
  isCountable: boolean;
  isActive: boolean;
}

interface MediaFormProps {
  media?: Media;
  submitText: string;
  mutation: any;
}

const MediaForm: FC<MediaFormProps> = (props) => {
  const navigate = useNavigate();

  console.log(props.media)

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {mediaName, mediaDescription, mediaCost, mediaPrice, mediaUnits, mediaCategoryId, isByBlocks, isCountable, isActive} = event.target as HTMLFormElement;

    const data = {
      mediaCategoryId: Number.parseInt(mediaCategoryId.value),
      name: mediaName.value,
      description: mediaDescription.value,
      cost: Number.parseFloat(mediaCost.value),
      price: Number.parseFloat(mediaPrice.value),
      minimumUnits: Number.parseInt(mediaUnits.value),
      isByBlocks: isByBlocks.checked === true,
      isCountable: isCountable.checked === true,
      isActive: isActive.checked === true,
    };

    console.log(data);

    props.mutation.mutate(data);
    navigate({ to: "/app/media" });
  };

  return (
    <div>
      <h1 className="text-3xl mr-auto">{props.submitText} media</h1>
      <form onSubmit={handleOnSubmit} className="mt-4 bg-white p-4 rounded">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="mediaName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Media name
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.media?.name ?? ""}
                type="text"
                name="mediaName"
                id="mediaName"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="mediaDescription"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Media description
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.media?.description ?? ""}
                type="text"
                name="mediaDescription"
                id="mediaDescription"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="mediaCost"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cost
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.media?.cost ?? ""}
                type="text"
                name="mediaCost"
                id="mediaCost"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="mediaPrice"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.media?.price ?? "9.81"}
                type="text"
                name="mediaPrice"
                id="mediaPrice"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="mediaUnits"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Minimum units
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.media?.minimumUnits ?? "10"}
                type="text"
                name="mediaUnits"
                id="mediaUnits"
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="mediaCategoryId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category id
            </label>
            <div className="mt-2">
              <input
                defaultValue={props.media?.mediaCategoryId ?? "1"}
                type="text"
                name="mediaCategoryId"
                id="mediaCategoryId"
                readOnly
                disabled
                className="block w-full rounded px-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="form-control sm:col-span-1">
            <label className="label cursor-pointer flex flex-col items-start space-y-2">
              <span className="label-text">Is by blocks?</span>
              <input type="checkbox" name="isByBlocks"
                id="isByBlocks" className="toggle" defaultChecked={props.media?.isByBlocks ? true : false} />
            </label>
          </div>

          <div className="form-control sm:col-span-1">
            <label className="label cursor-pointer flex flex-col items-start space-y-2">
              <span className="label-text">Is countable?</span>
              <input type="checkbox" name="isCountable"
                id="isCountable" className="toggle" defaultChecked={props.media?.isCountable ? true : false} />
            </label>
          </div>

          <div className="form-control sm:col-span-1">
            <label className="label cursor-pointer flex flex-col items-start space-y-2">
              <span className="label-text">Is active?</span>
              <input type="checkbox" name="isActive"
                id="isActive" className="toggle" defaultChecked={props.media?.isActive ? true : false} />
            </label>
          </div>

          <div className="space-x-2 mt-4 flex justify-end items-center">
            <Link
              to="/app/media"
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

        </div>
      </form>
    </div>
  );
};

export default MediaForm;
