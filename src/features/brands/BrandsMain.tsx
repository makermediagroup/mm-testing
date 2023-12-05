import { useState } from "react";
import BrandsOptions from "./BrandsOptions";
import BrandsList from "./BrandsList";

const BrandsMain = () => {
  const [isListView, setIsListView] = useState(false);

  const handleToggleView = () => {
    setIsListView((prev) => !prev);
  };

  return (
    <div className="flex flex-col space-y-8">
      <BrandsOptions
        isListView={isListView}
        onClickToggleView={handleToggleView}
      />
      <BrandsList isListView={isListView} />
    </div>
  );
};

export default BrandsMain;
