import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../components/Context/Auth";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <h1 className="flex flex-col lg:flex-row items-top justify-left space-y-6 mt-20">
        <div className="flex w-full lg:w-1/4 item-center justify-center lg:justify-start border lg:border-0">
          <UserMenu />
        </div>
        <div className="flex lg:w-3/4 px-2">
          <div className="overflow-hidden">
            <h1 className="text-xl text-center w-full font-bold">Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow my-2 overflow-y-scroll">
                  <table className="m-2">
                    <thead>
                      <tr className="border">
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
                      <tr className="border">
                        <td className="border text-center p-2">{i + 1}</td>
                        <td className="border text-center p-2">{o?.status}</td>
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
      </h1>
    </Layout>
  );
};

export default Orders;
