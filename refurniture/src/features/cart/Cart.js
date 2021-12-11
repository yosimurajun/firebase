import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

export const Cart = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("products")) {
      setOrders(JSON.parse(localStorage.getItem("products")));
    }
  }, []);

  console.log(orders);

  return (
    <section>
      <div className="cart">
        <div className="left cart_list">
          <h2>Cart</h2>
          {orders.map((order) => (
            <div className="items" key={order.product.id}>
              <img className="thumnail" src={order.product.thumnail} alt="" />
              <div className="detail_content">
                <h4>{order.product.title}</h4>
                <div
                  style={{ marginTop: "-10px" }}
                  className="font-smallerSize"
                >
                  <p>{order.product.size}</p>
                  <p>${order.product.price}</p>
                </div>
                <Link
                  to="/"
                  style={{ marginLeft: "0px" }}
                  className="content_texts font-smallerSize font-bold font-underline"
                >
                  Show parts
                </Link>
                <div className="card_buttons font-smallerSize">
                  <input type="number" value={order.number} />
                  <button className="button-none ">remove product</button>
                  <button className="button-none ">save for later</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="right">
          <h3>Order summary</h3>
          <p>Total delivery cost</p>
          <p>This subtotal doesn't include the delivery cost</p>
          <div className="right_line"></div>
          <div className="total_section">
            <span>Subtotal</span>
            <span className="font-midSize font-bold">$123123</span>
          </div>
          <div className="button_account">
            <p className="font-bold">Have an account?</p>
            <p>
              <Link
                to="/"
                style={{ marginLeft: "0px" }}
                className="color-gray font-underline"
              >
                Join or log in
              </Link>
              for a smoother checkout.
            </p>
          </div>
          <div className="button_checkout">
            <Link
              className="color-white font-bold"
              to="/"
              style={{ marginLeft: "0px" }}
            >
              Continue to checkout
            </Link>
          </div>
          <div className="font-smallerSize">
            <span className="icon icon-heart ">heart</span>
            <span>365 days to change you mind</span>
          </div>
          <div className="font-smallerSize">
            <span className="icon icon-private ">heart</span>
            <span>Secure shopping with SSL data encryption</span>
          </div>
        </div>
      </div>
    </section>
  );
};
