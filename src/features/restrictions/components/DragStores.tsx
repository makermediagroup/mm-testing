import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";

interface Store {
  storeId: number;
  storeFormatId: number;
  regionId: number;
  stateId: number;
  name: string;
  location: string;
}

interface DragStoresProps {
  handleOnDrag: (e: React.DragEvent, itemId: number, itemName: string) => void;
}

const DragStores: FC<DragStoresProps> = (props) => {
  const query = useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: () =>
      fetch("https://localhost:7243/api/store").then((res) => res.json()),
  });

  if (query.isFetching) {
    return <div>loading...</div>;
  }

  if (query.isError) {
    return <pre>{query.error.message}</pre>;
  }

  if (!query.data) {
    return <p>no data</p>;
  }

  return (
    <div>
      <h2 className="font-bold mb-2">Stores</h2>
      <div className="bg-white border rounded space-y-1 p-1 max-h-72 overflow-y-scroll">
        {query.data.map((store) => (
          <div
            draggable
            onDragStart={(e) =>
              props.handleOnDrag(e, store.storeId, store.name)
            }
            key={store.storeId}
            className="flex items-center bg-gray-100 border rounded py-1 hover:cursor-move"
          >
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
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>

            <p className="text-sm">{store.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragStores;
