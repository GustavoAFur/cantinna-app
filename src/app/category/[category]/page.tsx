"use client";
import Itens from "@/app/_components/Itens";
import { Product } from "@/app/_components/RecomendedList";
import { db } from "@/utils/firebaseConfig";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Category = () => {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const CategoryName = params.category;

  const CategoryHeader = () => {
    return (
      <div className="relative flex items-center justify-center gap-4">
        <ArrowLeft
          size={28}
          className=" absolute left-0 cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="font-bold text-2xl capitalize">{CategoryName}</h1>
      </div>
    );
  };

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
      <div className="px-8 pt-6 w-full">
        <CategoryHeader />
        <div className="flex items-center justify-center w-full h-[100vh] m-0">
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="px-8 pt-6 w-full">
        <CategoryHeader />
        <div className="flex items-center justify-center w-full h-[100vh] m-0">
          <h1>Nenhum produto encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pt-6 w-full">
      <CategoryHeader />
      <div className="mt-5 grid grid-cols-2 gap-4 w-full">
        {products.map((product) => (
          <Itens key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
