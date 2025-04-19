'use client'

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-carts";
import { cn } from "@/lib/utils";
import { Product } from "@/types-d";
import { CookingPot, ShoppingCart, Soup, SquareActivity, Utensils } from "lucide-react";
import React, { useState } from "react";

interface InfoProps {
  product: Product;
}
const Info = ({ product }: InfoProps) => {
    const [qty, setQty] = useState(1)

    const cart = useCart()

    const handleQty = (num: number) => {
        setQty(num)
        cart.updateItemQuantity(product.id, num)
    }
    const addToCart = (data: Product) => {
      cart.addItem({...data, qty: qty})
    }

  return (
    <div>
      <h1 className="text-3xl font-bold to-neutral-800">{product.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-base text-left text-neutral-600">
          fo3jfojojfoewofj fo3jfojojfoewofj fo3jfojojfoewofjfo3jfojojfoewofj
          fo3jfojojfoewofj
        </p>
      </div>
      <div className="w-full flex items-center justify-start gap-2 flex-wrap px-2 mt-8">
        {product.cuisine && (
          <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-base font-semibold capitalize flex items-center gap-2">
            <CookingPot className="w-5 h-5" />
            {product.cuisine}
          </div>
        )}

        {product.category && (
          <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-base font-semibold capitalize flex items-center gap-2">
            <Soup className="w-5 h-5" />
            {product.category}
          </div>
        )}

        {product.kitchen && (
          <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-base font-semibold capitalize flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            {product.kitchen}
          </div>
        )}

        {product.size && (
          <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-base font-semibold capitalize flex items-center gap-2">
            <SquareActivity className="w-5 h-5" />
            {product.size}
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-4 my-12">
        <div className="col-span-1 space-y-8">
            <p className="text-lg font-semibold text-neutral-700">Price</p>
            <p className="text-lg font-semibold text-neutral-700">Serves</p>
        </div>
        <div className="col-span-3 space-y-8">
            <p className="text-xl font-bold text-black">{product.price}</p>
          
        </div>
      </div>

      <Button onClick={() => addToCart(product)} className="w-full py-6 text-xl font-semibold hover:bg-hero hover:text-white flex items-center justify-center gap-3">
        Add to cart
        <ShoppingCart className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Info;
