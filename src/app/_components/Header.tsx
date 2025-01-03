import { ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Bag from "./Bag";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-8 pt-8 gap-16">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </Link>
      <Sheet>
        <SheetTrigger>
          {/* ICONE DE BAG */}
          <ShoppingBag />
        </SheetTrigger>
        <SheetContent className="w-[90vw] max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Minha sacola</SheetTitle>
          </SheetHeader>
          <Bag />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
