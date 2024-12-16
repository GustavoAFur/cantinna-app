import Image from "next/image";
import { Product } from "./RecomendedList";
import Link from "next/link";
import { useEffect } from "react";
interface Props {
  product: Product;
}

const Itens = ({ product }: Props) => {
  return (
    <Link
      href={`/product-details/${product.id}`}
      className=" min-w-[140px] max-w-[140px] flex flex-col gap-4 mt-4 truncate"
    >
      <div className="relative w-full h-[140px] rounded-sm overflow-hidden flex items-center justify-center">
        <Image
          src={product.imageUrl || "image-not-found.png"}
          alt={product.name}
          fill
          className="object-cover bg-slate-100"
        />
      </div>
      <div>
        <h2 className="font-bold capitalize">{product.name}</h2>
        <p>
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </Link>
  );
};

export default Itens;
