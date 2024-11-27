import React, { useContext } from "react";
import { ShopContext } from "../context/Shopcontext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { filteredProducts } = useContext(ShopContext);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-100 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Collection</h1>
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}
    </div>
  );
};

export default Collection;
