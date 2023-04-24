import React from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../components/Context/Cart";
import { useAuth } from "../components/Context/Auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
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

  return (
    <Layout>
      <h1 className="flex flex-col items-center justify-center space-y-6 mt-20">
        <div className="text-xl">{`Welcome ${
          auth?.token && auth?.user?.name
        }`}</div>
        <div>
          {" "}
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your Cart Is Empty"}
        </div>
        <div className="flex flex-row space-x-10">
          <div className="flex flex-col">
            {cart?.map((p) => (
              <div className="flex flex-col shadow-xl p-4">
                <div className="text-center">{p.name}</div>
                <img
                  src={`/api/v1/product/product-image/${p._id}`}
                  className="w-[10rem] m-2"
                  alt={p.name}
                />
                <p className="text-center">Price: £{p.price}</p>
                <button
                  className="px-4 py-2 text-gray-200 hover:text-black bg-red-500 border rounded-xl text-sm flex items-center justify-center font-semibold"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col shadow-xl p-4">
            <div className="mb-2 text-center font-semibold">Cart Summary</div>
            <div> Total Price: {totalPrice()}</div>
          </div>
        </div>
      </h1>
    </Layout>
  );
};

export default CartPage;
