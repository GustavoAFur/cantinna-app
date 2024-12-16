import Link from "next/link";
import { categories } from "../_data/categories";
import ProductsByCategory from "./ProductsByCategory";
const ListProductsByCategory = () => {
  return (
    <div className="mt-4 w-full space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col">
          <div className="px-8 flex justify-between">
            <h1 className="capitalize font-bold text-xl">{category.name}</h1>
            <Link
              href={`/category/${category.name}`}
              className="text-[#e84f1c]"
            >
              Ver todos
            </Link>
          </div>
          <ProductsByCategory CategoryName={category.name} />
        </div>
      ))}
    </div>
  );
};

export default ListProductsByCategory;
