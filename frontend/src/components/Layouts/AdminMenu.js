import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="flex flex-col items-top justify-left ml-2">
        <h1 className="text-xl text-center py-2">Admin Panel</h1>
        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) => {
            return isActive
              ? "px-6 py-4 text-cyan-300 bg-gray-800 border text-sm flex items-center justify-center font-semibold"
              : "px-6 py-4 text-gray-800  text-sm flex items-center justify-center font-semibold ";
          }}
        >
          Manage Categories
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className={({ isActive }) => {
            return isActive
              ? "px-6 py-4 text-cyan-300 bg-gray-800 border text-sm flex items-center justify-center font-semibold"
              : "px-6 py-4 text-gray-800  text-sm flex items-center justify-center font-semibold ";
          }}
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className={({ isActive }) => {
            return isActive
              ? "px-6 py-4 text-cyan-300 bg-gray-800 border text-sm flex items-center justify-center font-semibold"
              : "px-6 py-4 text-gray-800  text-sm flex items-center justify-center font-semibold ";
          }}
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/product/:slug"
          className={({ isActive }) => {
            return isActive
              ? "px-6 py-4 text-cyan-300 bg-gray-800 border text-sm flex items-center justify-center font-semibold"
              : "px-6 py-4 text-gray-800  text-sm flex items-center justify-center font-semibold ";
          }}
        >
          Update Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) => {
            return isActive
              ? "px-6 py-4 text-cyan-300 bg-gray-800 border text-sm flex items-center justify-center font-semibold"
              : "px-6 py-4 text-gray-800  text-sm flex items-center justify-center font-semibold ";
          }}
        >
          Users
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
