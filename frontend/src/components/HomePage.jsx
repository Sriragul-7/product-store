import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product";
import Card from "./Card";
import { ClipLoader } from "react-spinners";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products || []);
  const searchQuery = useProductStore((state) => state.searchQuery);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    load();
  }, [fetchProducts]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#3b82f6" />
      </div>
    );
  }

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center m-10">
          <h2 className="text-2xl font-bold mx-5">
            {products.length === 0
              ? "No products yet,"
              : "No matching products,"}
          </h2>
          <Link to="/create">
            <span className="text-2xl text-blue-500 cursor-pointer hover:text-blue-600 hover:underline">
              create new product
            </span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-4/5 max-w-7xl mx-auto mt-10">
          {filteredProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
