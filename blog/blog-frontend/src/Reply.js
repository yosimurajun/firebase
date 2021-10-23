import React, { useState, useEffect } from "react";
import "./Reply.css";
import { _axios } from "./axios";
import Pagination from "./Pagination";

function Reply({ id, user }) {
  const [data, setData] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    function getReply() {
      _axios
        .get("/reply/" + id)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => console.log(err));

      return () => setData([]);
    }

    getReply();
  }, [id, data]);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentReplys(data) {
    let currentPosts = 0;
    currentPosts = data.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    _axios
      .post("/reply/write", {
        content_id: id,
        replyer: user,
        content: replyText,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    setReplyText("");
  };

  const deleteReply = (id) => {
    _axios
      .get("/reply/delete/" + id)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const sort__data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="reply">
      <h2>reply</h2>
      {user && (
        <form onSubmit={onSubmit}>
          <p className="replyer">{user}</p>
          <textarea
            type="text"
            className="reply__text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className="btn btn__write" type="submit">
            write
          </button>
        </form>
      )}

      {currentReplys(sort__data).map((reply) => (
        <div key={reply._id} className="reply__content">
          <h4>{reply.replyer}</h4>
          <span>{reply.date.split("T")[0]}</span>
          {reply.content.split("\n").map((line) => (
            <p>{line}</p>
          ))}
          {user?.type === "master" && (
            <button
              className="btn btn__delete"
              onClick={() => deleteReply(reply._id)}
            >
              delete
            </button>
          )}
        </div>
      ))}
      <Pagination
        totalDataNumber={data.length}
        postsPerPage={postsPerPage}
        paginate={setCurrentPage}
      />
    </div>
  );
}

export default Reply;
