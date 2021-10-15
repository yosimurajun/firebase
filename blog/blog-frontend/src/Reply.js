import React, { useState, useEffect } from "react";
import "./Reply.css";
import { _axios } from "./axios";

function Reply({ id, user }) {
  const [data, setData] = useState([]);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    async function getReply() {
      const sorted_data = await _axios.get("/reply/" + id);
      setData(sorted_data.data);
    }

    getReply();
  }, [id, data]);

  const onSubmit = (e) => {
    e.preventDefault();
    _axios
      .post("/reply/write", {
        content_id: id,
        replyer: user,
        content: replyText,
      })
      .then((response) => setReplyText(""))
      .catch((err) => console.log(err));
  };

  return (
    <div className="reply">
      <h2>reply</h2>
      <form onSubmit={onSubmit}>
        <input type="text" id="reply_content" value={user} />
        <textarea
          type="text"
          id="reply_content"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button type="submit">write</button>
      </form>
      {data.map((reply) => (
        <div className="reply__content">
          <h4>{reply.replyer}</h4>
          <span>{reply.date}</span>
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Reply;
