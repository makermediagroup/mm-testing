import axios from "axios";
import StoresForm from "../../../features/stores/StoresForm";
import { useMutation } from "@tanstack/react-query";
const StoresCreator = () => {
  const mutation = useMutation({
    mutationKey: ["createStore"],
    mutationFn: (body: any) =>
      axios.post("https://localhost:7243/api/store", body),
  });

  return (
    <>
      <StoresForm submitText="Create" mutation={mutation} />
    </>
  );
};

export default StoresCreator;
