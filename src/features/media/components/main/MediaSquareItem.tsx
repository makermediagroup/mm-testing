import { type FC, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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

interface MediaSquareItemProps {
  media: Media;
}

const MediaSquareItem: FC<MediaSquareItemProps> = (props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteMedia", props.media.mediaId],
    mutationFn: () =>
      axios.delete(`https://localhost:7243/api/Media/${props.media.mediaId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["media"],
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
    <div className="p-2 bg-white rounded">
      <p>
        <span className="font-bold">Name:</span> {props.media.name}
      </p>
      <p>
        <span className="font-bold">Category:</span> {props.media.mediaCategoryId}
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Link
          to="/app/media/$id"
          params={{ id: `${props.media.mediaId}` }}
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
    </div>
  );
};

export default MediaSquareItem;
