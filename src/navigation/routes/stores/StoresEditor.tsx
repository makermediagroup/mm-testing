import StoresForm from "../../../features/stores/StoresForm";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import axios from "axios";

interface Store {
  storeId: number;
  storeFormatId: number;
  regionId: number;
  stateId: number;
  name: string;
  location: string;
}

const StoresEditor = () => {
  const params = useParams({ from: "/app/stores/$id" });
  const storeId = params.id;

  const query = useQuery<Store>({
    queryKey: ["stores", storeId],
    queryFn: () =>
      axios
        .get(`https://localhost:7243/api/store/${storeId}`)
        .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationKey: ["updateStore", storeId],
    mutationFn: (data: any) =>
      axios.put(`https://localhost:7243/api/store/${storeId}`, data),
  });

  if (query.isFetching) {
    return <p>Loading...</p>;
  }

  if (query.isError) {
    return <p>Error: {query.error.message}</p>;
  }

  if (!query.data) {
    return <p>No data</p>;
  }

  return (
    <>
      <StoresForm submitText="Update" mutation={mutation} store={query.data} />
    </>
  );
};

export default StoresEditor;
