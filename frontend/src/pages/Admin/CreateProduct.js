/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //get all categories
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

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        console.log(data?.message);
      } else {
        console.log("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="flex flex-row items-top justify-left space-y-6 mt-20">
        <div className="flex w-1/4">
          <AdminMenu />
        </div>
        <div className="flex flex-col w-full">
          <div>
            <h1 className="text-2xl mb-4">Create Product</h1>
            <div className="m-2 w-80">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="border p-2 w-80"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div>
                <label className="my-4 p-2 text-gray-200 hover:text-cyan-300 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    on
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-4">
                {image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="image"
                      height={"200px"}
                      className="flex"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter name of product"
                  onChange={(e) => setName(e.target.value)}
                  className="w-80 p-2 border"
                />
              </div>
              <div className="mb-4">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="w-80 p-2 border"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="w-80 p-2 border"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="w-80 p-2 border"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="w-80 border p-2"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-4">
                <button
                  onClick={handleCreate}
                  className="mb-40 w-80 my-4 p-2 text-gray-200 hover:text-cyan-300 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                >
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </h1>
    </Layout>
  );
};

export default CreateProduct;
