import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginContext } from "./auth-context";
import "./App.css";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Business from "./Business";
import Item from "./Item";
import Login from "./Login";
import BlogForm from "./BlogForm";
import Study from "./Study";
import { _axios } from "./axios";

function App() {
  const [signUser, setSignUser] = useState({
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      _axios
        .post("/user/token", { token: token })
        .then((response) => {
          setSignUser({
            accessToken: token,
            user: {
              type: response.type,
              userid: response.userid,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);
  console.log(signUser);
  return (
    <LoginContext.Provider value={{ signUser, setSignUser }}>
      <Router>
        <div className="app">
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/business" component={Business} />
            <Route exact path="/study" component={Study} />
            <Route exact path="/item/:id" component={Item} />
            <Route exact path="/etc" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/blog/write" component={BlogForm} />
          </Switch>
        </div>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
