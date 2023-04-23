import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";

const Orders = () => {
  return (
    <Layout>
      <h1 className="flex flex-row items-top justify-left space-y-6 mt-20">
        <div className="flex w-1/4">
          <UserMenu />
        </div>
        <div className="flex w-3/4 items-">
          <div>
            <h1 className="">Orders</h1>
          </div>
        </div>
      </h1>
    </Layout>
  );
};

export default Orders;
