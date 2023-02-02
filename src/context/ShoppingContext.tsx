import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/UseLocalStorage";

//type for children component
type ChildrenProps = {
  children: ReactNode;
};

// type for createContext
type ShoppingCartContext = {

  getItemQty: (id: number) => number;
  increaseItemQty: (id: number) => void;
  decreaseItemQty: (id: number) => void;
  removeCartItem: (id: number) => void;
  
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItemType[];
  cartQuantity: number;
};

// cart item type
type CartItemType = {
  id: number;
  quantity: number;
};

// context
const ShoppingContext = createContext({} as ShoppingCartContext);

// useContext hook
export const useShoppingCart = () => {
  return useContext(ShoppingContext);
};

export const ShoppingCartProvider = ({ children }: ChildrenProps) => {
  //state for cart items
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItemType[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // shopping cart actions
  // 1 getItemQuantity
  const getItemQty = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // 2 increaseItemQuantity
  const increaseItemQty = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // 3 decreaseItemQuantity
  const decreaseItemQty = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // 4 remove item
  const removeCartItem = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingContext.Provider
      value={{
        getItemQty,
        increaseItemQty,
        decreaseItemQty,
        removeCartItem,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingContext.Provider>
  );
};
