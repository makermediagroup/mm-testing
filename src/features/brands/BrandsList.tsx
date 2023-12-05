import { type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BrandSquareItem from "./BrandSquareItem";
import BrandsListItem from "./BrandsListIem";

interface BrandsListProps {
  isListView: boolean;
}

interface Brand {
  brandId: number;
  advertiserId: number;
  categoryId: number;
  name: string;
}

const BrandsList: FC<BrandsListProps> = (props) => {
  const query = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: () =>
      axios.get(`https://localhost:7243/api/Brand`).then((res) => res.data),
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
        {query.data.map((brand) => {
          return <BrandsListItem key={brand.brandId} brand={brand} />;
        })}
      </ul>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {query.data.map((brand) => {
        return <BrandSquareItem key={brand.brandId} brand={brand} />;
      })}
    </div>
  );
};

export default BrandsList;
