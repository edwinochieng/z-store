import { Products } from '@/pages/api/products';
import { create } from 'zustand'
import {persist} from 'zustand/middleware'

export type Cart = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description:string
    quantity: number;
}

interface Store {
  cartItems: Cart[]
  addToCart: (product:Products) => void
  updateQuantity: (product:Products, action: 'increase' | 'decrease') => void
  clearCart:() => void
  removeFromCart: (product:Products) => void
}

const useStore = create<Store>()(
    persist(
        (set,get) => ({
            cartItems: [],

            addToCart: (product) => {

               const newItem = {...product, quantity:1}
               const cart = get().cartItems;

               const foundIndex = cart.findIndex((item) => item.id === product.id);
               if (foundIndex >= 0) {
                 cart[foundIndex] = {
                   ...cart[foundIndex],
                   quantity: cart[foundIndex].quantity + 1,
                 };
               } else {
                 set(() => ({
                   cartItems: [...cart, newItem],
                 }));
               }
            },
            updateQuantity: (product,action) => {
              const cart = get().cartItems;
              const foundIndex = cart.findIndex((item) => item.id === product.id);

              if(foundIndex >=0){
                if (action === 'increase') {
                  cart[foundIndex] = {
                    ...cart[foundIndex],
                    quantity: cart[foundIndex].quantity + 1,
                  };
                } else if(action === 'decrease') {
                 cart[foundIndex] = {
                   ...cart[foundIndex],
                   quantity: cart[foundIndex].quantity > 1 ? cart[foundIndex].quantity - 1 : cart[foundIndex].quantity
                 };
                }
              }
              
            }
             ,
            
            removeFromCart: (product) => {
              set({cartItems: get().cartItems.filter((item) => item.id !== product.id)})
          },

          clearCart: () => set({cartItems: [] }),

          })
          , {name:'cart', getStorage: () => localStorage}
    )
    )

export default useStore

