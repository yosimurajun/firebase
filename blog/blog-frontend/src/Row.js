import React from "react";
import "./Row.css";

function Row({ title, date }) {
  return (
    <div className="row">
      <h1>{title}</h1>
      <span>{date.replaceAll("-", ".")}</span>
    </div>
  );
}

export default Row;
