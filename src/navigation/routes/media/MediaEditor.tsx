import { useParams } from "@tanstack/react-router";
import MediaForm from "../../../features/media/components/creator/MediaForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Media {
  mediaId: number;
  mediaCategoryId: number;
  name: string;
  description: string;
  cost: number;
  price: number;
  minimumUnits: number;
  isByBlocks: boolean;
  isCountable: boolean;
  isActive: boolean;
}

const MediaEditor = () => {
  const params = useParams({ from: "/app/media/$id" });
  const mediaId = params.id;

  const query = useQuery<Media>({
    queryKey: ["media", mediaId],
    queryFn: () =>
      axios
        .get(`https://localhost:7243/api/Media/${mediaId}`)
        .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationKey: ["editMedia"],
    mutationFn: (body: any) =>
      axios.put(`https://localhost:7243/api/Media/${mediaId}`, body),
  });

  return (
    <>
      <MediaForm submitText="Save" mutation={mutation} media={query.data} />
    </>
  )
};

export default MediaEditor;