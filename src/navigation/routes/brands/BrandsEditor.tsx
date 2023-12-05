import { useParams } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import BrandsForm from "../../../features/brands/BrandsForm";

interface Brand {
  brandId: number;
  advertiserId: number;
  categoryId: number;
  name: string;
}

const BrandsEditor = () => {
  const params = useParams({ from: "/app/brands/$id" });
  const brandId = params.id;

  const query = useQuery<Brand>({
    queryKey: ["brands", brandId],
    queryFn: () =>
      axios
        .get(`https://localhost:7243/api/Brand/${brandId}`)
        .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationKey: ["updateBrand", brandId],
    mutationFn: (data: any) =>
      axios.put(`https://localhost:7243/api/Brand/${brandId}`, data),
  });

  if (query.isFetching) {
    return <p>Loading...</p>;
  }

  if (query.isError) {
    return <p>Error: {query.error.message}</p>;
  }

  if (!query.data) {
    return <p>no data</p>;
  }

  return (
    <>
      <BrandsForm submitText="Update" mutation={mutation} brand={query.data} />
    </>
  );
};

export default BrandsEditor;
