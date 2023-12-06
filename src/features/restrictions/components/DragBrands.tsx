import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type FC } from "react";

interface Brand {
  brandId: number;
  advertiserId: number;
  categoryId: number;
  name: string;
}

interface DragBrandsProps {
  handleOnDrag: (e: React.DragEvent, itemId: number, itemName: string) => void;
}

const DragBrands: FC<DragBrandsProps> = (props) => {
  const query = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: () =>
      axios.get("https://localhost:7243/api/brand").then((res) => res.data),
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
      <h2 className="font-bold mb-2">Brands</h2>
      <div className="bg-white border rounded space-y-1 p-1 max-h-72 overflow-y-scroll">
        {query.data.map((brand) => (
          <div
            draggable
            onDragStart={(e) =>
              props.handleOnDrag(e, brand.brandId, brand.name)
            }
            key={brand.brandId}
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

            <p className="text-sm">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragBrands;
