import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClockLoader } from "react-spinners";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="mb-2 text-xl">
        Redirecting you to the Sign In page in {count} second
      </div>
      <ClockLoader color="cyan" />
    </div>
  );
};

export default Spinner;
