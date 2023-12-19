import { useQuery } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction } from "react";

interface Media {
  mediaId: number;
  mediaCategoryId: number;
  name: string;
  description: string;
  cost: number;
  price: number;
  minimumUnits: number;
  isCountable: boolean;
  isActive: boolean;
}

interface StepSelectMediaProps {
  mediaIds: Array<number>;
  setMediaIds: Dispatch<SetStateAction<Array<number>>>;
}

const StepSelectMedia: FC<StepSelectMediaProps> = (props) => {
  const query = useQuery<Media[]>({
    queryKey: ["media"],
    queryFn: () =>
      fetch("https://localhost:7243/api/Media").then((res) => res.json()),
  });

  const toggleFromArray = (id: number) => {
    if(props.mediaIds.includes(id)) {
      props.setMediaIds(prev => prev.filter(s => s !== id));
    } else {
      props.setMediaIds(prev => [...prev, id])
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
        <h1 className="font-bold mb-2">Select media</h1>
      </div>
      <div className="grid grid-cols-4">
        {query.data.map(media => (
          <div className="cursor-pointer" onClick={() => toggleFromArray(media.mediaId)} key={media.mediaId}>
            <p className={`${props.mediaIds.includes(media.mediaId) ? 'text-blue-500' : 'text-black'}`}>{media.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default StepSelectMedia;