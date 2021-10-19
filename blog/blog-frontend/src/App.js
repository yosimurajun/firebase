import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Business from "./Business";
import Item from "./Item";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import { LoginContext } from "./auth-context";
import BlogForm from "./BlogForm";
import Study from "./Study";

function App() {
  const [signIn, setSiginIn] = useState(false);
  const [signUser, setSignUser] = useState({});

  useEffect(() => {
    const signin_user = JSON.parse(localStorage.getItem("user"));
    if (signin_user) {
      setSignUser(signin_user);
      setSiginIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <LoginContext.Provider value={{ signUser, signIn, setSiginIn }}>
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/business" component={Business} />
            <Route exact path="/study" component={Study} />
            <Route exact path="/item/:id" component={Item} />
            <Route exact path="/etc" component={Home} />
            <Route exact path="/login" component={signIn ? Home : Login} />
            <Route exact path="/blog/write" component={BlogForm} />
          </Switch>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
