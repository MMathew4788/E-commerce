import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="flex flex-col items-top justify-left ml-2">
        <h1 className="text-xl text-center py-2">Dashboard </h1>
        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) => {
            return isActive
              ? "px-6 py-4 text-cyan-300 bg-gray-800 border text-sm flex items-center justify-center font-semibold"
              : "px-6 py-4 text-gray-800  text-sm flex items-center justify-center font-semibold ";
          }}
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className={({ isActive }) => {
            return isActive
              ? "px-6 py-4 text-cyan-300 bg-gray-800 border text-sm flex items-center justify-center font-semibold"
              : "px-6 py-4 text-gray-800  text-sm flex items-center justify-center font-semibold ";
          }}
        >
          Orders
        </NavLink>
      </div>
    </>
  );
};

export default UserMenu;
