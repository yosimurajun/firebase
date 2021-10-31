import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { LoginContext } from "../../auth-context";

function Nav() {
  const [active, setActive] = useState(false);

  const { signUser, setSignUser } = useContext(LoginContext);

  const logout = () => {
    localStorage.setItem("token", "");
    setSignUser({
      ...signUser,
      user: undefined,
    });
  };

  return (
    <div className="nav">
      <p className="user_info">
        {signUser.user &&
          `log in ${signUser.user.type} ${signUser.user.userid}`}
      </p>
      <Link to="/">Home</Link>
      <button
        onClick={() => setActive(!active)}
        className={active ? "dropdown selected" : "dropdown"}
      >
        Content
      </button>
      <div
        className={
          active ? "dropdown__container active" : "dropdown__container"
        }
      >
        <Link to="/business">Business</Link>
        <Link to="/study">Study</Link>
      </div>
      <Link to="/etc">etc</Link>
      {signUser.user ? (
        <Link to="/login">
          <button onClick={logout}>Logout</button>
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Nav;
