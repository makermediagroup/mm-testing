import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import BrandsForm from "../../../features/brands/BrandsForm";

const BrandsCreator = () => {
  const mutation = useMutation({
    mutationKey: ["createBrand"],
    mutationFn: (body: any) =>
      axios.post("https://localhost:7243/api/Brand", body),
  });

  return (
    <>
      <BrandsForm submitText="Create" mutation={mutation} />
    </>
  );
};

export default BrandsCreator;
