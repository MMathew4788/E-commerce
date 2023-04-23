import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/Auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleSignOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  //dropdown
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="bg-gray-800 shadow fixed top-0 w-full z-10">
        <div className="container mx-auto lg:px-4">
          <div className="flex items-center justify-between py-4">
            <div className="ml-2 md:ml-0 flex flex-col lg:flex-row sm:items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-300 text-sm font-semibold mr-10"
                    : "text-gray-200 text-sm mr-10 hover:text-cyan-300"
                }
              >
                Home Page
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-300 text-sm font-semibold mr-10"
                    : "text-gray-200 text-sm mr-10 hover:text-cyan-300"
                }
              >
                About
              </NavLink>
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-300 text-sm font-semibold mr-10"
                    : "text-gray-200 text-sm mr-10 hover:text-cyan-300"
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-300 text-sm font-semibold mr-10"
                    : "text-gray-200 text-sm mr-10 hover:text-cyan-300"
                }
              >
                Contact
              </NavLink>
            </div>
            <div className="flex flex-col lg:flex-row sm:items-center">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-300 text-sm font-semibold mr-10"
                    : "text-gray-200 text-sm mr-10 hover:text-cyan-300"
                }
              >
                Cart (0)
              </NavLink>
              {!auth.user ? (
                <>
                  <NavLink
                    to="/signin"
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-300 text-sm font-semibold mr-10"
                        : "text-gray-200 text-sm mr-10 hover:text-cyan-300"
                    }
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-300 text-sm font-semibold mr-10"
                        : "text-gray-200 text-sm mr-10 hover:text-cyan-300"
                    }
                  >
                    Sign up
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="relative inline-block text-left mr-10 md:mr-0">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700"
                      onClick={toggleDropdown}
                    >
                      {auth?.user?.name}
                      {isOpen ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          className="-mr-1 ml-2 h-5 w-5"
                        >
                          <path d="M6.293 10.707a1 1 0 0 0 1.414 0L10 8.414l2.293 2.293a1 1 0 1 0 1.414-1.414l-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 0 0 0 1.414z" />
                        </svg>
                      ) : (
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M10.293 14.293a1 1 0 0 1-1.414 0L5.293 9.293a1 1 0 0 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4z" />
                        </svg>
                      )}
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex="-1"
                        >
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-cyan-300 text-sm flex items-center justify-center font-semibold"
                                : "text-gray-200 text-sm flex itemms-center justify-center hover:text-cyan-300 py-2"
                            }
                          >
                            Dashboard
                          </NavLink>

                          <NavLink
                            onClick={handleSignOut}
                            to="/signin"
                            className={({ isActive }) =>
                              isActive
                                ? "text-cyan-300 text-sm flex items-center justify-center font-semibold"
                                : "text-gray-200 text-sm flex items-center justify-center hover:text-cyan-300 py-2"
                            }
                          >
                            Sign Out
                          </NavLink>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
