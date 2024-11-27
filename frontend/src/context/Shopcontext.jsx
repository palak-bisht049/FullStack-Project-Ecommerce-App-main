import { createContext, useState } from "react";
import { products } from "../constants/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [cartItems, setCartItems] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  const addToCart = async (itemId, size) => {
    if (!size) return;

    let cartData = deepClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        totalCount += cartItems[items][item];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => String(product._id) === String(items));
      if (itemInfo) {
        for (const item in cartItems[items]) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    filteredProducts,
    setFilteredProducts,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    getCartAmount,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
