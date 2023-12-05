import { type FC, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Brand {
  brandId: number;
  advertiserId: number;
  categoryId: number;
  name: string;
}

interface BrandSquareItemProps {
  brand: Brand;
}

const BrandSquareItem: FC<BrandSquareItemProps> = (props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteBrand", props.brand.brandId],
    mutationFn: () =>
      axios.delete(`https://localhost:7243/api/Brand/${props.brand.brandId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });

  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (clicks === 1) {
      const unsub = setTimeout(() => setClicks(0), 3000);
      return () => {
        clearTimeout(unsub);
      };
    }

    if (clicks === 2) {
      mutation.mutate();
    }
  }, [clicks]);

  return (
    <div className="p-2 bg-white rounded">
      <p>
        <span className="font-bold">Name:</span> {props.brand.name}
      </p>
      <p>
        <span className="font-bold">Location:</span> {props.brand.categoryId}
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Link
          to="/app/brands/$id"
          params={{ id: `${props.brand.brandId}` }}
          className="py-2 px-4 font-bold text-gray-900 bg-gray-200 rounded text-sm text-center"
        >
          Edit
        </Link>
        <button
          className="py-2 px-4 font-bold text-red-900 bg-red-200 rounded text-sm"
          onClick={() => setClicks((p) => p + 1)}
        >
          {clicks === 0 ? "Delete" : "Sure?"}
        </button>
      </div>
    </div>
  );
};

export default BrandSquareItem;
