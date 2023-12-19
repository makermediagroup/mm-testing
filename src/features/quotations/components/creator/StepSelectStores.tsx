import { useQuery } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction } from "react";

interface Store {
  storeId: number;
  storeFormatId: number;
  regionId: number;
  stateId: number;
  name: string;
  location: string;
}

interface StepSelectStoresProps {
  storeIds: Array<number>;
  setStoreIds: Dispatch<SetStateAction<Array<number>>>
}

const StepSelectStores: FC<StepSelectStoresProps> = (props) => {
  const query = useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: () =>
      fetch("https://localhost:7243/api/store").then((res) => res.json()),
  });

  const toggleFromArray = (id: number) => {
    if(props.storeIds.includes(id)) {
      props.setStoreIds(prev => prev.filter(s => s !== id));
    } else {
      props.setStoreIds(prev => [...prev, id])
    }
  }

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
    <div className="my-4">
      <div>
        <h1 className="font-bold mb-2">Select stores</h1>
      </div>
      <div className="grid grid-cols-3">
      {query.data.map(store => (
        <div className="cursor-pointer" onClick={() => toggleFromArray(store.storeId)} key={store.storeId}>
          <p className={`${props.storeIds.includes(store.storeId) ? 'text-blue-500' : 'text-black'}`}>{store.name}</p>
        </div>
      ))}
      </div>
    </div>
  )
};

export default StepSelectStores;