import { useState } from "react";
import RestrictionsOptions from "./RestrictionsOptions";
import RestrictionsList from "./RestrictionsList";

const RestrictionsMain = () => {
  const [isListView, setIsListView] = useState(false);

  const handleToggleView = () => {
    setIsListView((prev) => !prev);
  };

  return (
    <div className="flex flex-col space-y-8">
      <RestrictionsOptions
        isListView={isListView}
        onClickToggleView={handleToggleView}
      />
      <RestrictionsList isListView={isListView} />
    </div>
  );
};

export default RestrictionsMain;
