"use client";
import { useSearchParams } from "next/navigation";
import Header from "../_components/Header";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { Product } from "../_components/RecomendedList";
import Itens from "../_components/Itens";
const Products = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("name");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (searchQuery) {
          const q = query(
            collection(db, "products"),
            where("name", ">=", searchQuery.toLowerCase()),
            where("name", "<=", searchQuery.toLowerCase() + "\uf8ff")
          );
          const q2 = query(
            collection(db, "products"),
            where("tokens", "array-contains", searchQuery.toLowerCase())
          );

          const querySnapshot = await getDocs(q);
          const tokenSnapshot = await getDocs(q2);

          const results = new Map();

          querySnapshot.forEach((doc) => {
            results.set(doc.id, { ...doc.data(), id: doc.id });
          });

          tokenSnapshot.forEach((doc) => {
            results.set(doc.id, { ...doc.data(), id: doc.id });
          });

          const products: Product[] = Array.from(results.values()) as Product[];

          setProducts(products);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [searchQuery]);

  return (
    <div>
      <Header />
      <h1 className="px-8 pt-6">Resultados para: &quot;{searchQuery}&quot;</h1>
      <div className="px-8 mt-5 grid grid-cols-2 gap-4 w-full">
        {products.map((product) => (
          <Itens key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
