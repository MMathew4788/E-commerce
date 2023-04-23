import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        console.log(`${name} is created`);
        getAllCategory();
      } else {
        console.log(`${data.name} is not created`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        console.log(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        console.log(`$(data.message)`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        console.log(`category is deleted`);
        getAllCategory();
      } else {
        console.log(`$(data.message)`);
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
          <h1 className="text-2xl mb-4">Manage Category</h1>
          <div className="py-4 w-full">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div>
            <table className="shadow-lg">
              <thead>
                <tr>
                  <th className="border px-8 py-2">Name</th>
                  <th className="border px-8 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id} className="border px-8 py-2">
                        {c.name}
                      </td>
                      <td className="border px-8 py-2 flex flex-row space-x-3">
                        <button
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                          className="px-4 py-2 text-gray-200 hover:text-cyan-300 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                          className="px-4 py-2 text-gray-200 hover:text-red-500 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </h1>
    </Layout>
  );
};

export default CreateCategory;
