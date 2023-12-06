import { useState } from "react";
import DragBrands from "../../../features/restrictions/components/DragBrands";
import DragCategories from "../../../features/restrictions/components/DragCategories";
import DragStores from "../../../features/restrictions/components/DragStores";
import DropRestriction from "../../../features/restrictions/components/DropRestriction";
import DragMedia from "../../../features/restrictions/components/DragMedia";

const RestrictionsCreator = () => {
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);

  const clearItems = () => {
    setItems([]);
  };

  const removeItem = (itemId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleOnDrag = (
    e: React.DragEvent,
    itemId: number,
    itemName: string
  ) => {
    e.dataTransfer.setData("itemId", `${itemId}`);
    e.dataTransfer.setData("itemName", itemName);
  };

  const handleOnDrop = (e: React.DragEvent) => {
    const itemId = e.dataTransfer.getData("itemId") as string;
    const itemName = e.dataTransfer.getData("itemName") as string;
    console.log(itemId, itemName);
    if (!items.some((item) => item.id === Number(itemId))) {
      setItems([...items, { id: Number(itemId), name: itemName }]);
    }
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="bg-gray-50 w-full mb-8">
        <h1 className="font-bold text-2xl mb-2">Create restriction</h1>
        <p>Drag and drop the elements to create a new restriction</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-8 xl:gap-16 2xl:gap-32">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search in all elements..."
            className="py-1 px-2 border rounded"
          />
          <DragMedia handleOnDrag={handleOnDrag} />
          <DragStores handleOnDrag={handleOnDrag} />
          <DragBrands handleOnDrag={handleOnDrag} />
          <DragCategories handleOnDrag={handleOnDrag} />
        </div>
        <div>
          <DropRestriction
            items={items}
            clearItems={clearItems}
            removeItem={removeItem}
            handleOnDrop={handleOnDrop}
            handleOnDragOver={handleOnDragOver}
          />
        </div>
      </div>
    </div>
  );
};

export default RestrictionsCreator;
