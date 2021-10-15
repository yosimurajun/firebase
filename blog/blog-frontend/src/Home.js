import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Row from "./Row";
import { _axios } from "./axios";

const Data = [
  {
    id: "1",
    title: "1111",
    content: "1111",
    date: "2011-11-11",
  },
  {
    id: "2",
    title: "22222222",
    content: "2222222222",
    date: "2022-12-12.",
  },
  {
    id: "3",
    title: "33333333333",
    content: "3333333",
    date: "2033-01-13",
  },
  {
    id: "4",
    title: "4444444444",
    content: "44444444",
    date: "2044-04-14",
  },
];

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    _axios
      .get("/blog/all")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home">
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

export default Home;
