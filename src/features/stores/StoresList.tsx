import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import StoreSquareItem from "./StoresSquareItem";
import StoreListItem from "./StoreListItem";

interface StoreListProps {
  isListView: boolean;
}

interface Store {
  storeId: number;
  storeFormatId: number;
  regionId: number;
  stateId: number;
  name: string;
  location: string;
}

const StoresList: FC<StoreListProps> = (props) => {
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

  if (props.isListView) {
    return (
      <ul role="list" className="divide-y divide-gray-100 bg-white p-4 rounded">
        {query.data.map((store) => {
          return <StoreListItem key={store.storeId} store={store} />;
        })}
      </ul>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {query.data.map((store) => {
        return <StoreSquareItem key={store.storeId} store={store} />;
      })}
    </div>
  );
};

export default StoresList;
