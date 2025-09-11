import { useContext } from "react"
import { CartContext } from "../component/Cart/CartContext"



const useCart = () => {
    return useContext(CartContext)  
}

export default useCart 