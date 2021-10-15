import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { _axios } from "./axios";
import { LoginContext } from "./auth-context";

function Login() {
  const { setSiginIn } = useContext(LoginContext);
  const [user, setUser] = useState({ userid: "", password: "" });
  const history = useHistory();

  const onsubmit = (e) => {
    e.preventDefault();
    _axios
      .post("/user/signin", user)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setSiginIn(true);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <form onSubmit={onsubmit}>
        <input
          type="text"
          className="userid"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, userid: e.target.value }))
          }
        />
        <input
          type="text"
          className="pasword"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
