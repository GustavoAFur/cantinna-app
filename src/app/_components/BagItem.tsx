"use client";
import Image from "next/image";
import { BagContext, BagProduct } from "../_context/bagContext";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Trash2,
  TrashIcon,
} from "lucide-react";
import { useContext } from "react";

interface Props {
  product: BagProduct;
}

const BagItem = ({ product }: Props) => {
  const {
    removeProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useContext(BagContext);

  return (
    <div className="flex items-center gap-4">
      <div className="relative min-w-20 min-h-20 max-w-20 max-h-20 rounded-md overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-1">
        <h2 className="text-xs capitalize">{product.name.slice(0, 16)}...</h2>
        <div className="flex items-baseline gap-2">
          <h1 className="font-semibold text-sm">
            {product?.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h1>
          <span className="text-muted-foreground text-xs">
            {product?.und} Und
          </span>
        </div>
        <div className="flex items-center text-center gap-3">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="border border-solid border-muted-foreground"
            onClick={() => decreaseProductQuantity(product.id)}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="text-sm w-3">{product.quantity}</span>
          <Button
            size={"icon"}
            onClick={() => increaseProductQuantity(product.id)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        className="w-8 h-8"
        onClick={() => removeProductFromCart(product.id)}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default BagItem;
