import { Products } from '@/utils/data'
import { create } from 'zustand'

interface Store {
  cartItems: Products[]
  quantity:number
  addToCart: (product:Products) => void
}

const useStore = create<Store>((set) => ({
  cartItems: [],
  quantity:0,
  addToCart: (product) => {
    set(state => (
        {
            quantity: state.quantity + 1,
            cartItems:[...state.cartItems, product]
        }
    ))
  }
}))

export default useStore