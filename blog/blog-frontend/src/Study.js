import React, { useState, useEffect, useContext } from "react";
import Row from "./Row";
import { Link } from "react-router-dom";
import { LoginContext } from "./auth-context";
import { _axios } from "./axios";
import "./Content.css";

function Study() {
  const [data, setData] = useState([]);
  const { signUser } = useContext(LoginContext);
  useEffect(() => {
    _axios
      .get("/blog/all")
      .then((response) =>
        setData(response.data.filter((blog) => blog.type === "12"))
      )
      .catch((err) => console.log(err));
  }, [data]);

  return (
    <div className="content study">
      {signUser.type === "master" && <Link to="/blog/write">write</Link>}
      {data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((item) => (
          <Link to={"/item/" + item._id}>
            <Row title={item.title} content={item.content} date={item.date} />
          </Link>
        ))}
    </div>
  );
}

export default Study;
