import { Products } from '@/utils/data'
import { create } from 'zustand'
import {persist} from 'zustand/middleware'

interface Store {
  cartItems: Products[]
  quantity:number
  addToCart: (product:Products) => void
}

const useStore = create<Store>()(
    persist(
        (set) => ({
            cartItems: [],
            quantity:0,
            addToCart: (product) => {
              set((state) => (
                  {
                      quantity: state.quantity + 1,
                      cartItems:[...state.cartItems, product]
                  }
              ))
            }
          })
          , {name:'cart', getStorage: () => localStorage}
    )
    )

export default useStore