"use client";
import { db } from "@/utils/firebaseConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Itens from "./Itens";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
  und: string;
}
const RecomendedList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "products"), // Coleção de produtos
          orderBy("relevance", "desc"), // Ordena pela relevância em ordem decrescente
          limit(10) // Limita a quantidade de produtos retornados
        );

        const querySnapshot = await getDocs(q);
        const products: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos recomendados:", error);
        setError("Erro ao carregar produtos recomendados."); // Set error message
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="px-8">
        <h1 className="font-bold text-xl">Recomendados:</h1>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className=" min-w-[140px] flex flex-col gap-4 mt-4"
            >
              <Skeleton className="w-full h-[140px] rounded-sm" />
              <Skeleton className="w-full h-3 rounded-sm" />
              <Skeleton className="w-full h-3 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>; // Display error message
  }

  return (
    <div className="w-full">
      <h1 className="px-8 font-bold text-xl">Recomendados:</h1>
      <div className="px-8 flex gap-4 overflow-x-scroll scrollbar-hide">
        {products.map((product) => (
          <Itens key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecomendedList;
