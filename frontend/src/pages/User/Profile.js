import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../components/Context/Auth";

const Profile = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <h1 className="flex flex-row items-top justify-left space-y-6 mt-20">
        <div className="flex w-1/4">
          <UserMenu />
        </div>
        <div className="flex w-3/4 items-">
          <div>
            <h1 className="">Name: {auth?.user?.name}</h1>
            <h1 className="">Email: {auth?.user?.email}</h1>
          </div>
        </div>
      </h1>
    </Layout>
  );
};

export default Profile;
