import React from "react";
import "./Sidebar.css";
import Nav from "./Nav";

function Sidebar() {
  return (
    <div className="sidebar">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/900px-BMW_logo_%28gray%29.svg.png"
        alt="logo"
      />
      <Nav />
    </div>
  );
}

export default Sidebar;
