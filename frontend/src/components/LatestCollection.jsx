/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(10);

  useEffect(() => {
    // Sort products by date or ID to ensure truly latest products
    const sortedProducts = [...products].sort(
      (a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
    );
    setLatestProducts(sortedProducts.slice(0, visibleProducts));
  }, [products, visibleProducts]);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 5);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="max-w-2xl mx-auto text-sm text-gray-600 mt-4">
          Discover our newest arrivals - fresh styles curated just for you
        </p>
      </div>

      {/* Product Grid with Hover Effects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProducts.map((item, index) => (
          <div
            key={item._id}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleProducts < products.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
