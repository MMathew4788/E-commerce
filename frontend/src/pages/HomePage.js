import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import Prices from "../components/Prices.js";
import { useCart } from "../components/Context/Cart";
import banner from "../Assets/banner.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  async function filterProduct() {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="flex flex-col">
        <div
          className="hidden md:flex w-full h-[80vh] bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="w-1/2 font-bold text-2xl md:text-5xl text-center text-gray-800 bg-cyan-300 bg-opacity-70 p-4">
            Bags that complement your unique style
          </div>
        </div>
        <div className="mt-20 md:mt-0 flex flex-col md:flex-row items-left justify-top">
          <div className="flex flex-col md:w-1/5 border">
            {/* category filter */}
            <div className="border p-4">
              <div className="text-lg py-3">FILTERS</div>
              <div className="flex flex-row">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            </div>
            {/* price filter */}
            <div className="border p-4">
              <div className="text-lg py-3">PRICE</div>
              <div className="flex flex-col">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="mt-3 p-4">
              <button
                className=" border border-gray-800 hover:bg-gray-800 hover:text-cyan-300 text-gray-800 p-2 text-center p-2"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:w-4/5 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {products?.map((image) => (
                <div className="shadow-xl flex p-4 items-top justify-center">
                  <div className="flex flex-col m-2" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-image/${image._id}`}
                      className="h-[15rem]"
                      alt={image.name}
                    />
                    <div className="flex flex-col">
                      <h5 className="bg-cyan-300 text-gray-800 font-semibold p-2 text-center">
                        {image.name}
                      </h5>
                      <p className="text-gray-500">
                        {image.description.substring(
                          0,
                          image.description.indexOf(".") + 1
                        )}
                      </p>
                      <p className="text-gray-800 font-bold">£ {image.price}</p>
                      <button
                        className="text-gray-800 border border-cyan-300 p-2 mb-2 text-center"
                        onClick={() => navigate(`/product/${image.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="bg-gray-800 text-cyan-300 text-center p-2"
                        onClick={() => {
                          setCart([...cart, image]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, image])
                          );
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
