"use client";
import { useEffect, useState } from "react";
import { Product } from "./RecomendedList";
import {
  query,
  collection,
  getDocs,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import Itens from "./Itens";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsByCategory = ({
  CategoryName = "",
}: {
  CategoryName: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", CategoryName),
          orderBy("relevance", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const products: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(products);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (CategoryName) getData();
  }, [CategoryName]);

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className=" min-w-[140px] flex flex-col gap-4 mt-4">
            <Skeleton className="w-full h-[140px] rounded-sm" />
            <Skeleton className="w-full h-3 rounded-sm" />
            <Skeleton className="w-full h-3 rounded-sm" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <p>Nenhum produto encontrado nesta categoria.</p>
      </div>
    );
  }

  return (
    <div className=" px-8 flex gap-4 w-full overflow-x-scroll scrollbar-hide">
      {products.map((product) => (
        <Itens key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsByCategory;
