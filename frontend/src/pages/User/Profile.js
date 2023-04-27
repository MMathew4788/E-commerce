import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../components/Context/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        },
        navigate("/dashboard/user")
      );
      if (data?.error) {
        console.log(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        console.log("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="flex flex-row items-top justif•y-left space-y-6 mt-20">
        <div className="flex w-1/4">
          <UserMenu />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 mt-20 mb-20">
          <div className="text-3xl font-bold">User Profile</div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-80 overflow-y-scroll"
          >
            <div className="flex flex-col space-y-2 ">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-cyan-300 p-2"
                placeholder="Please enter your name"
                id="name"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-cyan-300 p-2"
                placeholder="Please enter your email"
                id="email"
                disabled
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-cyan-300 p-2"
                placeholder="Enter new password/ Update password"
                id="password"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Contact Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-cyan-300 p-2"
                placeholder="Please enter your contact number"
                id="contact-number"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-cyan-300 p-2"
                placeholder="Please enter your address"
                id="address"
              />
            </div>
            <button className="p-4 bg-cyan-300 rounded-xl text-gray-800 hover:bg-cyan-400">
              Update
            </button>
          </form>
        </div>
      </h1>
    </Layout>
  );
};

export default Profile;
