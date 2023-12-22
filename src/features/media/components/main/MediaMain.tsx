import { useState } from "react";
import MediaOptions from "./MediaOptions";
import MediaList from "./MediaList";

const MediaMain = () => {
  const [isListView, setIsListView] = useState(false);

  const handleToggleView = () => {
    setIsListView((prev) => !prev);
  };

  return (
    <div>
      <MediaOptions
        isListView={isListView}
        onClickToggleView={handleToggleView}
      />
      <MediaList isListView={isListView} />
    </div>
  )
};

export default MediaMain;