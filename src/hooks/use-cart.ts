
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/components/product-card';
import { toast } from './use-toast';

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeAll: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          // If item exists, update its quantity
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + product.quantity }
                : item
            ),
          });
        } else {
          // If item doesn't exist, add it to the cart
          set({ items: [...currentItems, product] });
        }
        
        toast({
            title: 'Added to cart',
            description: `${product.name} (x${product.quantity}) has been added.`,
        });
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
         toast({
            title: 'Item removed',
            description: `The item has been removed from your cart.`,
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
