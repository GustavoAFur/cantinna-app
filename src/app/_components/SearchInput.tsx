"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 px-8 pt-6">
      <Input
        placeholder="Procure por um produto..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <Button
        size={"icon"}
        onClick={() => {
          router.push(`/products?name=${searchQuery.toLowerCase()}`);
        }}
      >
        <Search size="icon" />
      </Button>
    </div>
  );
};

export default SearchInput;
/*

const searchQuery = "coxi"; // Substring buscada

const querySnapshot = await firestore
  .collection("products")
  .where("name", ">=", searchQuery.toLowerCase())
  .where("name", "<=", searchQuery.toLowerCase() + "\uf8ff") // Para limitar a busca ao prefixo
  .get();

const tokenSnapshot = await firestore
  .collection("products")
  .where("tokens", "array-contains", searchQuery.toLowerCase())
  .get();

// Combinar os resultados
const results = new Map();

// Adicionar resultados da busca por intervalo
querySnapshot.forEach((doc) => {
  results.set(doc.id, doc.data());
});

// Adicionar resultados da busca por tokens
tokenSnapshot.forEach((doc) => {
  results.set(doc.id, doc.data());
});

// Resultado final
const finalResults = Array.from(results.values());
console.log(finalResults);

*/
