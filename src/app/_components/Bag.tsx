"use client";
import { useContext, useState } from "react";
import { BagContext } from "../_context/bagContext";
import BagItem from "./BagItem";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
const Bag = () => {
  const { products, totalPrice, clearCart } = useContext(BagContext);
  const [isSaving, setIsSaving] = useState(false);

  const saveOrder = async () => {
    try {
      setIsSaving(true);
      const simplifiedProducts = products.map((product) => ({
        id: product.id, // ID do produto
        name: product.name, // Nome do produto
        quantity: product.quantity, // Quantidade no pedido
        price: product.price, // Preço unitário
      }));

      const ordersRef = collection(db, "orders");

      const orderData = {
        products: simplifiedProducts,
        totalPrice,
        createdAt: new Date(),
      };
      await addDoc(ordersRef, orderData).then(() => {
        alert("Pedido realizado com sucesso!");
        clearCart();
        setIsSaving(false);
      });
    } catch (error) {
      alert("Erro ao realizar o pedido.");
      setIsSaving(false);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Sacola vazia.</p>
      </div>
    );
  }

  return (
    <div className="py-5 flex flex-col h-full">
      <div className="space-y-4 flex-auto">
        {products.map((product) => (
          <BagItem key={product.id} product={product} />
        ))}
      </div>

      <div className="mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="h-full flex items-center justify-between">
              <span>Total:</span>{" "}
              <span>
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button className="bg-[#e84f1c]" onClick={saveOrder} disabled={isSaving}>
        {isSaving ? "Salvando..." : "Finalizar Pedido"}
      </Button>
    </div>
  );
};

export default Bag;
