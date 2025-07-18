import { useState } from "react"
import { RiDeleteBin3Line } from "react-icons/ri"


const CartContents = () => {
  const [quantity, setQuantity] = useState(1)
  
    const cartProducts = [
       {
        productId: 1,
        name: "T-shirt",
        size: "M",
        color: "Red",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/200?random=1"
       },
       {
        productId: 2,
        name: "Jeans",
        size: "L",
        color: "Blue",
        quantity: 1,
        price: 25,
        image: "https://picsum.photos/200?random=2"
       },
    ]

    const [clientCarts, setClientCarts] = useState(cartProducts)

    
    const handleQuantityChange = (action, id) => {
        if(action === "plus") {
          setClientCarts((prev) => {
            const carts = prev.map(cart => {
              if(cart.productId === id) {
                return { ...cart, quantity: cart["quantity"] + 1 }
              } else {
                return cart
              }
            })
            return carts
          })
        }  else {
            setClientCarts((prev) => {
            const carts =  prev.map(cart => {
              if(cart.productId === id) {
                return { ...cart, quantity: cart["quantity"] > 0 ? cart["quantity"] - 1 : 0 }
              } else {
                return cart
              }
            })
            return carts
          })
        }
         

        console.log(clientCarts)
    }
  return (
    
    <div>
        {clientCarts.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-4 border-b border-gray-200"
              >
                <div className="flex items-start">
                    <img
                     src={product.image}
                     alt={product.name}
                     className="w-20 h-24 object-cover mr-4 rounded"
                    />
                    <div>
                        <h3>{product.name}</h3>
                        <p className="text-sm text-gray-500">
                            size: {product.size} | color: {product.color}
                        </p>
                        <div className="flex items-center mt-2">
                          <button onClick={() => handleQuantityChange("minus", product.productId)} className="border rounded px-2 py-1 text-xl font-medium">
                            -
                          </button>
                          <span className="mx-4">{product.quantity}</span>
                          <button onClick={() => handleQuantityChange("plus", product.productId)} className="border rounded px-2 py-1 text-xl font-medium">
                            +
                          </button>
                        </div>
                    </div>
                </div>
                <div>
                  <p>${product.price.toLocaleString()}</p>  
                  <button>
                    <RiDeleteBin3Line className="size-6 mt-2 text-red-600" />
                  </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default CartContents