import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../components/Context/Auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex flex-row items-top justify-left space-y-6 mt-20">
        <div className="flex w-1/4">
          <AdminMenu />
        </div>
        <div className="flex flex-col">
          <h1 className="text-center text-xl font-bold">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow my-2">
                <table className="m-2">
                  <thead>
                    <tr>
                      <th className="border text-center p-2" scope="col">
                        #
                      </th>
                      <th className="border text-center p-2" scope="col">
                        Status
                      </th>
                      <th className="border text-center p-2" scope="col">
                        Buyer Name
                      </th>
                      <th className="border text-center p-2" scope="col">
                        {" "}
                        Order Date
                      </th>
                      <th className="border text-center p-2" scope="col">
                        Payment Status
                      </th>
                      <th className="border text-center p-2" scope="col">
                        Number of product
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border text-center p-2">{i + 1}</td>
                      <td className="border text-center p-2">
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td className="border text-center p-2">
                        {o?.buyer?.name}
                      </td>
                      <td className="border text-center p-2">
                        {moment(o?.createAt).format("DD/MMMM/YYYY")}
                      </td>
                      <td className="border text-center p-2">
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                      <td className="border text-center p-2">
                        {o?.products?.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  {o?.products?.map((p, i) => (
                    <div
                      className="flex flex-row items-center mb-2 p-3"
                      key={p._id}
                    >
                      <div className="mr-4">
                        <img
                          src={`/api/v1/product/product-image/${p._id}`}
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>Price : £{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
