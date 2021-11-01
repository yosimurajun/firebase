import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Row from "../../Row";
import { _axios } from "../../axios";
import Pagination from "../../Pagination";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    _axios
      .get("/blog/all")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(post) {
    let currentPosts = [];
    currentPosts = post.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const sort__data = data.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="home">
      {loading
        ? "loading..."
        : currentPosts(sort__data).map((item) => (
            <Link key={item._id} to={"/item/" + item._id}>
              <Row
                type={item.type}
                title={item.title}
                date={item.date.split("T")[0]}
              />
            </Link>
          ))}

      <Pagination
        totalDataNumber={data.length}
        postsPerPage={postsPerPage}
        paginate={setCurrentPage}
      />
    </div>
  );
}

export default Home;
