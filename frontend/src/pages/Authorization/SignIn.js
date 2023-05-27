import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/Context/Auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-6 mt-28">
        <div className="text-3xl font-bold">Sign In</div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
          <div className="flex flex-row space-x-2">
            <button
              type="submit"
              className="p-4 bg-cyan-300 rounded-xl text-gray-800 hover:bg-cyan-400"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="p-4 border border-cyan-300 rounded-xl text-gray-800 hover:bg-cyan-300"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
