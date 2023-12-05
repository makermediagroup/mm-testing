import { type FC, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Store {
  storeId: number;
  storeFormatId: number;
  regionId: number;
  stateId: number;
  name: string;
  location: string;
}

interface StoreListItemProps {
  store: Store;
}

const StoreListItem: FC<StoreListItemProps> = (props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteStore", props.store.storeId],
    mutationFn: () =>
      axios.delete(`https://localhost:7243/api/Store/${props.store.storeId}`),
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
    <li className="flex justify-between gap-x-6 py-2">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {props.store.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {props.store.location}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
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
    </li>
  );
};

export default StoreListItem;
