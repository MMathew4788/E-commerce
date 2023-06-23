import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../components/Context/Cart";
import { useAuth } from "../components/Context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = +0;
      cart?.map((item) => {
        total = +total + +item.price;
      });
      return total.toLocaleString(undefined, {
        style: "currency",
        currency: "GBP",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      console.log("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Creating unique cart item

  function getUniqueItems() {
    // Assuming the 'cart' variable is defined and contains the cart items
    const uniqueItems = [];

    for (const item of cart) {
      // Check if the item already exists in the 'uniqueItems' array based on its ID
      const existingItem = uniqueItems.find(
        (uniqueItem) => uniqueItem._id === item._id
      );
      if (!existingItem) {
        // If the item doesn't exist, add it to the 'uniqueItems' array
        uniqueItems.push(item);
      }
    }
    return uniqueItems;
  }

  function getItemQuantity(itemId) {
    // Assuming the 'cart' variable is defined and contains the cart items
    let quantity = 0;
    for (const item of cart) {
      if (item._id === itemId) {
        // If the item ID matches, increment the quantity
        quantity++;
      }
    }
    return quantity;
  }

  return (
    <Layout>
      <h1 className="flex flex-col items-center justify-center space-y-6 my-28 mx-4">
        <div className="flex text-xl text-center">{`Welcome ${
          auth?.token && auth?.user?.name
        }`}</div>
        <div className="flex text-center">
          {" "}
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your Cart Is Empty"}
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          <div className="flex flex-col">
            {getUniqueItems().map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center shadow-xl p-4"
              >
                <div className="font-bold text-center">{item.name}</div>
                <img
                  src={`/api/v1/product/product-image/${item._id}`}
                  className="w-60 m-2"
                  alt={item.name}
                />
                <p className="text-center">Price: £{item.price}</p>
                <p className="text-center">
                  Quantity: {getItemQuantity(item._id)}
                </p>
                <button
                  className="w-60 px-4 py-2 text-gray-200 hover:text-black bg-red-500 border rounded-xl text-sm flex items-center justify-center font-semibold"
                  onClick={() => removeCartItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col shadow-xl p-4 mb-20">
            <div className="mb-2 text-center font-semibold">Cart Summary</div>
            <div className="text-center"> Total Price: {totalPrice()}</div>
            {auth?.user?.address ? (
              <>
                <div className="my-4">
                  <h1>Sipping Address : {auth?.user?.address}</h1>
                  <button
                    className="my-4 p-2 text-gray-200 hover:text-cyan-300 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="mb-40 p-2 text-gray-200 hover:text-red-500 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="my-4 p-2 text-gray-200 hover:text-cyan-300 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                    onClick={() =>
                      navigate("/signin", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-4 w-80 z-0 mb-10">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="p-2 text-gray-200 hover:text-cyan-300 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
                    onClick={handlePayment}
                    disabled={
                      loading ||
                      !instance ||
                      !auth?.user ||
                      !auth?.user?.address
                    }
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </h1>
    </Layout>
  );
};

export default CartPage;
