import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../components/Context/Auth";

const DashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <h1 className="flex flex-row items-top justify-left space-y-6 mt-20">
        <div className="flex w-1/4">
          <UserMenu />
        </div>
        <div className="flex flex-col w-3/4">
          <div className="text-3xl mb-4">Welcome {auth?.user?.name}</div>
          <div>
            <h1 className=""> Name: {auth?.user?.name}</h1>
            <h1 className=""> Email: {auth?.user?.email}</h1>
            <h1 className=""> Address: {auth?.user?.address}</h1>
          </div>
        </div>
      </h1>
    </Layout>
  );
};

export default DashBoard;
