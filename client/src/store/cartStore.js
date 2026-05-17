import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i._id === item._id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i._id === item._id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { cart: [...state.cart, { ...item, qty: 1 }] };
        }),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i._id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((i) => (i._id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i._id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      getTotal: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.qty, 0),

      getItemCount: () =>
        get().cart.reduce((sum, item) => sum + item.qty, 0),
    }),
    { name: "zesto-cart" }
  )
);
