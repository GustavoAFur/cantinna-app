"use client";
import React, { useContext, useEffect, useState } from "react";
import { Product } from "@/app/_components/RecomendedList";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  runTransaction
} from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { BagContext } from "@/app/_context/bagContext";
import Bag from "@/app/_components/Bag";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Itens from "@/app/_components/Itens";

const ProductDetails = () => {
  const params = useParams(); // Usando o hook para acessar os parâmetros
  const router = useRouter();

  const { addProductToCart } = useContext(BagContext);

  const [product, setProduct] = useState<Product>();
  const [beverages, setBeverages] = useState<Product[]>([]);

  const [quantity, setQuantity] = useState(1);

  const [openBag, setOpenBag] = useState(false);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleIncreaseQuantity10 = () => {
    setQuantity((prev) => prev + 10);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const addProduct = async ({ product }: { product: Product }) => {
    try {
      await runTransaction(db, async (transaction) => {
        const sfDocRef = doc(db, "products", product?.id as string);
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }

        const newRelevance = sfDoc.data().relevance + 1;
        transaction.update(sfDocRef, { relevance: newRelevance });
      }).then(() => {
        addProductToCart({ product }, quantity);
      })
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }

  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

        if (!id) {
          router.push("/404"); // Redireciona se o ID não for válido
          return;
        }

        // Busca o documento no Firestore
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ ...docSnap.data(), id: docSnap.id } as Product);
          console.log(docSnap.data());
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [params.id, router]);

  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        if (product?.category === "bebidas") {
          setBeverages([]); // Garante que a lista de bebidas recomendadas fique vazia
          return;
        }

        const q = query(
          collection(db, "products"),
          where("category", "==", "bebidas")
        );

        const querySnapshot = await getDocs(q);
        const beverages: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setBeverages(beverages);
      } catch (error) {
        console.log(error);
      }
    };
    if (product) {
      fetchBeverages();
    }
  }, [product]);

  return (
    <>
      <div>
        <div className="relative w-full h-[300px] bg-slate-300">
          <Image
            src={product?.imageUrl || "/image-not-found.png"}
            alt={product?.name || "Imagem nao encontrada"}
            fill
            className="object-cover"
          />
          <Button
            onClick={() => router.back()}
            size="icon"
            className="absolute top-4 left-4 rounded-full bg-white text-black flex items-center justify-center hover:text-white hover:bg-red-700"
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="pt-5 relative mt-[-1.5rem] zindex-10 bg-white rounded-tl-3xl rounded-tr-3xl">
          <div className="px-5">


            <h1 className="font-semibold text-xl capitalize">{product?.name}</h1>
            <span className="text-xs">{product?.category}</span>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <h1 className="font-semibold text-lg">
                  {product?.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h1>
                <span className="text-muted-foreground text-xs">
                  {product?.und} Und
                </span>
              </div>
              <div className="flex items-center gap-3 text-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="border border-solid border-muted-foreground"
                  onClick={handleDecreaseQuantity}
                >
                  <ChevronLeftIcon />
                </Button>

                <span className="w-4">{quantity}</span>

                <Button
                  size="icon"
                  className="bg-[#e84f1c]"
                  onClick={handleIncreaseQuantity}
                >
                  <ChevronRightIcon />
                </Button>
                <Button
                  size="icon"
                  className="bg-[#e84f1c]"
                  onClick={handleIncreaseQuantity10}
                >
                  <span>+10</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <h1 className="font-semibold text-lg">Sobre</h1>
              <p className="text-muted-foreground capitalize">
                {product?.description}
              </p>
            </div>
          </div>

          {beverages.length > 0 && (
            <div className="w-full mt-4">
              <h1 className="font-bold text-xl px-5">Experimente uma bebida...</h1>
              <div className="flex gap-4 px-5 overflow-x-scroll scrollbar-hide">
                {beverages.map((product) => (
                  <Itens key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
          <div className="w-full px-5 pb-5">

            <Button
              className="w-full mt-4 bg-[#e84f1c]"
              onClick={() => {
                if (product) {
                  addProduct({ product });
                }
                setOpenBag(true);
              }}
            >
              Adicionar
            </Button>
          </div>
        </div>
      </div>
      <Sheet open={openBag} onOpenChange={setOpenBag}>
        <SheetContent className="w-[90vw] max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Minha sacola</SheetTitle>
          </SheetHeader>
          <Bag />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductDetails;
