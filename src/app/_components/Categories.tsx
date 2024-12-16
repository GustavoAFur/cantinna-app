import Image from "next/image";
import { categories } from "../_data/categories";
import Link from "next/link";
const Categories = () => {
  return (
    <div className="p-8">
      <div className="w-full flex items-center justify-between">
        {categories.map((category) => (
          <Link
            href={`/category/${category.name}`}
            key={category.id}
            className="flex flex-col items-center w-16 px-2"
          >
            <div className="relative w-14 h-14 overflow-hidden flex items-center justify-center">
              <Image
                src={`/${category.img}`}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 font-semibold capitalize">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
