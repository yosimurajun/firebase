import React, { useState } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

export const Navbar = () => {
  const [active, setActive] = useState("Shop");

  const onClick = (e) => {
    setActive(e.target.innerText);
  };

  return (
    <nav>
      <div className="navLogo">
        <img className="logo-image" src="./logo.jpg" alt="logo" />
        <p className="font-bold font-midSize">
          <span className="color-blue">Re</span>Furniture
        </p>
      </div>
      <div className="navLinks ">
        <Link
          to="/about"
          className={
            active === "About"
              ? "color-active font-bold font-smallSize"
              : " font-smallSize"
          }
          onClick={onClick}
        >
          About
        </Link>
        <Link
          to="/"
          className={
            active === "Shop"
              ? "color-active font-bold font-smallSize"
              : " font-smallSize"
          }
          onClick={onClick}
        >
          Shop
        </Link>
        <Link
          to="/cart"
          className={
            active === "Cart"
              ? "color-active font-bold font-smallSize"
              : " font-smallSize"
          }
          onClick={onClick}
        >
          Cart
        </Link>
        <Link to="/" className="color-blue">
          Login in
        </Link>
        <Link to="/" className="button-blue">
          Sign up
        </Link>
      </div>
    </nav>
  );
};
