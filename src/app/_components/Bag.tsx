"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { BagContext } from "../_context/bagContext";
import BagItem from "./BagItem";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/firebaseConfig";
import { addDoc, collection } from "firebase/firestore"; 
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  address: Yup.string().required(),
  phone: Yup.string().required(),
  complement: Yup.string(),
  observation: Yup.string(),
});
const Bag = () => {
  const { products, totalPrice, clearCart } = useContext(BagContext);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (formContainerRef.current) {
        formContainerRef.current.style.setProperty(
          "bottom",
          `env(safe-area-inset-bottom)`
        );
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      handleResize(); // Initial call in case the keyboard is already open
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const saveCustomerInfo = (data: any) => {
    localStorage.setItem("customerInfo", JSON.stringify(data));
  };

  const getCustomerInfo = () => {
    const data = localStorage.getItem("customerInfo");
    return data ? JSON.parse(data) : null;
  };

  const customerInfo = getCustomerInfo();
  const formik = useFormik({
    initialValues: {
      name: customerInfo?.name || "",
      address: customerInfo?.address || "",
      phone: customerInfo?.phone || "",
      complement: customerInfo?.complement || "",
      observation: customerInfo?.observation || "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ name, address, phone, complement, observation }) => {
      try {
        // Salvar informações do cliente no localStorage
        saveCustomerInfo({ name, address, phone, complement, observation });

        // Salvar o pedido no Firestore
        const simplifiedProducts = products.map((product) => ({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          imageUrl: product.imageUrl,
        }));

        const ordersRef = collection(db, "orders");
        const orderData = {
          status: "aberto",
          items: simplifiedProducts,
          totalPrice,
          createdAt: new Date(),
          deliveryInfo: { name, address, phone, complement, observation },
        };

        setIsSaving(true);
        await addDoc(ordersRef, orderData);

        alert("Pedido realizado com sucesso!");
        clearCart();
        setIsSaving(false);
        setIsOpen(false);
      } catch (error) {
        alert("Erro ao realizar o pedido.");
        setIsSaving(false);
      }
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  function FormInfo({ className }: React.ComponentProps<"form">) {
    return;
  }

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
              <span>Total:</span>
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
      <Button
        className="bg-[#e84f1c]"
        onClick={() => setIsOpen(true)}
        disabled={products.length === 0}
      >
        Finalizar Pedido
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent ref={formContainerRef} className="min-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Dados Pessoais</DrawerTitle>
          </DrawerHeader>
          <form onSubmit={handleSubmit} method="POST">
            <div className="flex flex-col gap-4 px-4">
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Nome Completo"
                value={values.name}
                onChange={handleChange}
              />
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="Endereço"
                value={values.address}
                onChange={handleChange}
              />
              <Input
                type="text"
                id="phone"
                name="phone"
                placeholder="Telefone"
                value={values.phone}
                onChange={handleChange}
              />
              <Input
                type="text"
                id="complement"
                name="complement"
                placeholder="Complemento"
                value={values.complement}
                onChange={handleChange}
              />
              <Input
                type="text"
                id="observation"
                name="observation"
                placeholder="Observação"
                value={values.observation}
                onChange={handleChange}
              />
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Bag;
