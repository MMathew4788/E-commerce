import Layout from "../../components/Layouts/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-row items-top justify-left space-y-6 mt-20">
        <div className="flex w-1/4">
          <AdminMenu />
        </div>
        <div className="flex flex-col w-full pb-20">
          <h1 className="text-2xl mb-4">All Products List</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {products?.map((image) => (
              <Link
                key={image._id}
                to={`/dashboard/admin/product/${image.slug}`}
                className="shadow-xl flex items-top justify-center"
              >
                <div className="flex flex-col m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-image/${image._id}`}
                    className="w-[18rem]"
                    alt={image.name}
                  />
                  <div className="flex flex-col">
                    <h5 className="bg-gray-800 text-cyan-300 p-2 text-center">
                      {image.name}
                    </h5>
                    <p className="text-gray-500">{image.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
