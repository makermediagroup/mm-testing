import { type FC } from "react";

interface DragCategoriesProps {
  items: { id: number; name: string }[];
  clearItems: () => void;
  removeItem: (itemId: number) => void;
  handleOnDrop: (e: React.DragEvent) => void;
  handleOnDragOver: (e: React.DragEvent) => void;
}

const DropRestriction: FC<DragCategoriesProps> = (props) => {
  return (
    <div className="space-y-4 fixed">
      <h2 className="font-bold mb-2">Your restriction</h2>
      <div>
        <p className="text-sm mb-2">Select a date if needed</p>
        <div className="space-x-2">
          <input type="text" className="px-2 py-1 border rounded" />
          <input type="text" className="px-2 py-1 border rounded" />
        </div>
      </div>
      <div>
        <p className="text-sm mb-2">Elements</p>
        <div
          onDrop={props.handleOnDrop}
          onDragOver={props.handleOnDragOver}
          className="bg-white border rounded space-y-1 p-1"
        >
          {props.items.length > 0 ? (
            props.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100 border rounded py-1 px-2"
              >
                <p className="text-sm">{item.name}</p>
                <span onClick={() => props.removeItem(item.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            ))
          ) : (
            <p className="text my-4 text-gray-300 text-center">Empty</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <button className="py-2 px-4 rounded text-sm font-semibold mr-auto">
          Cancel
        </button>
        <button
          className="py-2 px-4 rounded text-sm font-semibold"
          onClick={props.clearItems}
        >
          Clear
        </button>
        <button className="py-2 px-4 bg-gray-200 rounded text-sm font-semibold">
          Create restriction
        </button>
      </div>
    </div>
  );
};

export default DropRestriction;
