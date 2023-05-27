import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res.data.success) {
        navigate("/signin");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-6 mt-28 mb-20">
        <div className="text-3xl font-bold">Sign Up</div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-72 overflow-y-scroll"
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
              required
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
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-cyan-300 p-2"
              placeholder="Please enter the password"
              id="password"
              required
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
              required
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
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label>Security Question</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border border-cyan-300 p-2"
              placeholder="What is your favorite sports"
              id="answer"
              required
            />
          </div>
          <button className="p-4 bg-cyan-300 rounded-xl text-gray-800 hover:bg-cyan-400">
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
