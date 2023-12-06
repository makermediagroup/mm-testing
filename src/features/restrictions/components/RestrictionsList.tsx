import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface RestrictionsListProps {
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

const RestrictionsList: FC<RestrictionsListProps> = (props) => {
  const query = useQuery<Store[]>({
    queryKey: ["restrictions"],
    queryFn: () =>
      fetch("https://localhost:7243/api/Restriction").then((res) => res.json()),
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
        {query.data.map((restriction, i) => {
          return (
            <div key={i}>
              <p>{JSON.stringify(restriction)}</p>
            </div>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {query.data.map((restriction, i) => {
        return (
          <div key={i}>
            <p>{JSON.stringify(restriction)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RestrictionsList;
