import { Link } from "@tanstack/react-router";
import { FC, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface StoreSquareItemProps {
  store: {
    storeId: number;
    name: string;
    location: string;
  };
}

const StoreSquareItem: FC<StoreSquareItemProps> = (props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleteStore", props.store.storeId],
    mutationFn: () =>
      axios.delete(`https://localhost:7243/api/store/${props.store.storeId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stores"],
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
        <span className="font-bold">Name:</span> {props.store.name}
      </p>
      <p>
        <span className="font-bold">Location:</span> {props.store.location}
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Link
          to="/app/stores/$id"
          params={{ id: `${props.store.storeId}` }}
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

export default StoreSquareItem;
