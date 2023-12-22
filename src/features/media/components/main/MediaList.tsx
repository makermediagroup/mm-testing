import { type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MediaListItem from "./MediaListItem";
import MediaSquareItem from "./MediaSquareItem";

interface MediaListProps {
  isListView: boolean;
}

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

const MediaList: FC<MediaListProps> = (props) => {
  const query = useQuery<Media[]>({
    queryKey: ["media"],
    queryFn: () =>
      axios.get(`https://localhost:7243/api/Media`).then((res) => res.data),
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

  if (props.isListView) {
    return (
      <ul role="list" className="divide-y divide-gray-100 bg-white p-4 rounded">
        {query.data.map((media) => {
          return <MediaListItem key={media.mediaId} media={media} />;
        })}
      </ul>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {query.data.map((media) => {
        return <MediaSquareItem key={media.mediaId} media={media} />;
      })}
    </div>
  );
};

export default MediaList;
