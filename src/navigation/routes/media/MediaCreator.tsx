import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import MediaForm from "../../../features/media/components/creator/MediaForm";

const MediaCreator = () => {
  const mutation = useMutation({
    mutationKey: ["createMedia"],
    mutationFn: (body: any) =>
      axios.post("https://localhost:7243/api/Media", body),
  });

  return (
    <>
      <MediaForm submitText="Create" mutation={mutation} />
    </>
  )
};

export default MediaCreator;