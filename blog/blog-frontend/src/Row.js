import React from "react";
import "./Row.css";

function Row({ type, title, date }) {
  return (
    <div className="row">
      {type && <span>{type === "12" ? "study" : "business"}</span>}
      <div className="row__item">
        <h1>{title}</h1>
        <span>{date.replaceAll("-", ".")}</span>
      </div>
    </div>
  );
}

export default Row;
