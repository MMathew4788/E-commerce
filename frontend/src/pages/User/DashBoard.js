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
        <div className="flex w-3/4 items-">
          <div className="text-3xl">Welcome {auth?.user?.name}</div>
        </div>
      </h1>
    </Layout>
  );
};

export default DashBoard;
