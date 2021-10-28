import React, { useState, useContext } from "react";
import { _axios } from "./axios";
import { LoginContext } from "./auth-context";
import "./Login.css";

function Login() {
  const { setSignUser } = useContext(LoginContext);
  const [user, setUser] = useState({ userid: "", password: "" });

  const onsubmit = async (e) => {
    e.preventDefault();

    const loginUser = {
      userid: user.userid,
      password: user.password,
    };

    const loggedInUser = await _axios.post("/user/signin", loginUser);

    localStorage.setItem(
      "token",
      JSON.stringify(loggedInUser.data.accessToken)
    );

    window.location = "/";
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={onsubmit}>
        <label htmlFor="userid">ID</label>
        <input
          id="userid"
          type="text"
          className="userid"
          minLength="4"
          maxLength="10"
          required
          placeholder="Enter your id"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, userid: e.target.value }))
          }
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          type="text"
          id="password"
          minLength="4"
          maxLength="12"
          className="password"
          placeholder="Enter your password"
          required
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button className="btn__login" type="submit">
          login
        </button>
      </form>
    </div>
  );
}

export default Login;
