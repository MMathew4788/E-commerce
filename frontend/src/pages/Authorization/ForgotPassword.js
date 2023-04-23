import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res && res.data.success) {
        navigate("/signin");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-6 mt-20">
        <div className="text-3xl font-bold">Reset Password</div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-60">
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
          <div className="flex flex-col space-y-2">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-cyan-300 p-2"
              placeholder="Please enter the password"
              id="password"
              required
            />
          </div>
          <div className="flex flex-row space-x-2">
            <button
              type="submit"
              className="p-4 bg-cyan-300 rounded-xl text-gray-800 hover:bg-cyan-400"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
