import { useState } from "react";
import StoresOptions from "./StoresOptions";
import StoresList from "./StoresList";

const StoresMain = () => {
  const [isListView, setIsListView] = useState(false);

  const handleToggleView = () => {
    setIsListView((prev) => !prev);
  };

  return (
    <div className="flex flex-col space-y-8">
      <StoresOptions
        isListView={isListView}
        onClickToggleView={handleToggleView}
      />
      <StoresList isListView={isListView} />
    </div>
  );
};

export default StoresMain;
