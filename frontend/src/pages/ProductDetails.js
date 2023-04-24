import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //inital product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-6 mt-20">
        <div className="flex flex-row m-2 justify-center">
          <img
            src={`/api/v1/product/product-image/${product._id}`}
            className="w-1/3"
            alt={product.name}
          />
          <div className="flex flex-col w-1/3 pl-10">
            <h5 className="text-xl font-semibold text-center">
              PRODUCT DETAILS
            </h5>
            <p className="text-xl"> NAME: {product.name}</p>
            <p className="text-xl text-gray-500 text-justify">
              DESCRIPTION: {product.description}
            </p>
            <p className="text-xl">CATEGORY: {product?.category?.name}</p>
            <p className="text-xl"> PRICE: {product.price}</p>
            <button className="bg-gray-800 text-cyan-300 text-center p-2">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="pb-20">
          <p className="text-center text-xl font-semibold">SIMILAR PRODUCTS</p>
          {relatedProducts.length < 1 && <p>No similar products found</p>}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {relatedProducts?.map((p) => (
              <div className="shadow-xl flex items-top justify-center">
                <div className="flex flex-col m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-image/${p._id}`}
                    className="w-[18rem]"
                    alt={p.name}
                  />
                  <div className="flex flex-col">
                    <h5 className="bg-cyan-300 text-gray-800 font-semibold p-2 text-center">
                      {p.name}
                    </h5>
                    <button
                      className="text-gray-800 border border-cyan-300 p-2 mb-2 text-center"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="bg-gray-800 text-cyan-300 text-center p-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
