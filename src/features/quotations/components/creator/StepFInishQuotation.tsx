import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";

interface StepFinishQuotationProps {
  storeIds: Array<number>;
  mediaIds: Array<number>;
}

interface StoreMedia {
  "storeMediaId": number,
  "storeId": number,
  "storeName": string,
  "mediaId": number,
  "mediaName": string,
  "qty": number,
  "minimumUnits": number,
  "isByBlock": boolean,
  "price": number
}

const groupBy = <T extends Record<keyof T, any>>(
  arr: T[],
  key: keyof T,
  name: keyof T
) => {
  const reduce = arr.reduce((result, sm) => {
    const propKey = `${sm[key]}`;
    const propName = `${sm[name]}`;

    result[propKey] = result[propKey] || {
      name: propName,
      data: [],
    };

    result[propKey].data.push(sm);

    return result;
  }, {} as Record<string, { name: string; data: T[] }>);

  return reduce;
};

const StepFinishQuotation: FC<StepFinishQuotationProps> = (props) => {
  const {storeIds, mediaIds} = props;
  const query = useQuery<StoreMedia[]>({
    queryKey: ["storesmedia", storeIds, mediaIds],
    queryFn: () =>
      fetch("https://localhost:7243/api/store/media", {
        method: "POST",
        body: JSON.stringify({
          storeIds,
          mediaIds
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => res.json()),
  });

  const [selected, setSelected] = useState<Array<number>>([]);
  const [keyGroupBy, setKeyGroupBy] = useState<keyof StoreMedia>("mediaId");
  const [nameGroupBy, setNameGroupBy] = useState<keyof StoreMedia>('mediaName');

  if (query.isFetching) {
    return <div>loading...</div>;
  }

  if (query.isError) {
    return <pre>{query.error.message}</pre>;
  }

  if (!query.data) {
    return <p>no data</p>;
  }

  const handleGroupBy = (key: keyof StoreMedia, name: keyof StoreMedia) => {
    setKeyGroupBy(key);
    setNameGroupBy(name);
  }

  const groupData = groupBy(query.data, keyGroupBy, nameGroupBy);

  return (
    <div>
      <div>
        <h1 className="font-bold mb-2">Create your quotation</h1>
      </div>
      <div className="flex space-x-2 items-center mb-2">
        <p>Group by:</p>
        <button onClick={() => handleGroupBy("mediaId", "mediaName")} className={` px-2 py-1 rounded ${keyGroupBy === 'mediaId' ? 'bg-blue-200' : 'bg-gray-100'}`}>Media</button>
        <button onClick={() => handleGroupBy("storeId", "storeName")} className={` px-2 py-1 rounded ${keyGroupBy === 'storeId' ? 'bg-blue-200' : 'bg-gray-100'}`}>Store</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {Object.keys(groupBy(query.data, keyGroupBy, nameGroupBy)).map(gk => (
            <div key={gk} className="my-4">
              <p className="font-bold text-sm mb-2">{groupData[gk].name}</p>
              <div className="bg-white rounded border p-1 grid grid-cols-1 gap-1">
                {groupData[gk].data.map(sm => (
                  <div key={sm.storeMediaId} className="border bg-gray-100 rounded p-2 cursor-pointer">
                    <div className="flex space-x-2">
                    <p>Media: <span className="font-bold">{sm.mediaName}</span></p>
                    <p>Store: <span className="font-bold">{sm.storeName}</span></p>
                    </div>
                    <div className="flex space-x-2">
                    <p className="text-sm">Qty: {sm.qty} - Min units: {sm.minimumUnits}</p>
                    <p className="text-sm">Price: {sm.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div>
            <p className="font-bold text-sm mb-2">Your services</p>
          </div>
          <div className="bg-white rounded border p-1 grid grid-cols-2">
            {query.data.filter(sm => selected.includes(sm.storeMediaId)).map(sm => (
              <div key={sm.storeMediaId} className="border bg-gray-100 rounded p-2">
                <div className="flex space-x-2">
                <p>Media: <span className="font-bold">{sm.mediaName}</span></p>
                <p>Store: <span className="font-bold">{sm.storeName}</span></p>
                </div>
                <div className="flex space-x-2">
                <p>Qty: {sm.qty} - Min units: {sm.minimumUnits}</p>
                <p>Price: {sm.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default StepFinishQuotation;