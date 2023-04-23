import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
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

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      image && productData.append("image", image);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        console.error(data?.message);
      } else {
        console.success("Product Updated Successfully");
      }
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Do you really want to delete this product ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      console.log(data.message);
      navigate("/dashboard/admin/products");
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
            <h1 className="text-2xl mb-4">Update Product</h1>
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
                value={category}
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
                    name="Product Image"
                    accept="image/*"
                    on
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-4">
                {image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product Img"
                      height={"200px"}
                      className="flex"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-image/${id}`}
                      alt="Product Img"
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
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-4">
                <button
                  onClick={handleUpdate}
                  className="my-4 w-80 p-2 text-gray-200 hover:text-cyan-300 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                >
                  UPDATE PRODUCT
                </button>
                <button
                  onClick={handleDelete}
                  className="mb-40 w-80 p-2 text-gray-200 hover:text-red-500 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </h1>
    </Layout>
  );
};

export default UpdateProduct;
