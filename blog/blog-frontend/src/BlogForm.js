import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { _axios } from "./axios";

function BlogForm() {
  const history = useHistory();
  // study code : 12
  // business code : 34
  const [data, setData] = useState({
    type: "",
    title: "",
    content: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    _axios
      .post("/blog/write", data)
      .then((response) => {
        if (response.data.type === "12") {
          history.push("/study");
        } else {
          history.push("/business");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="blog__form">
      <form onSubmit={onSubmit}>
        <label for="type">type</label>
        <select
          id="type"
          onChange={(e) =>
            setData((prev) => ({ ...prev, type: e.target.value }))
          }
        >
          <option>select category</option>
          <option value="12">study</option>
          <option value="34">business</option>
        </select>

        <label for="title">title</label>
        <input
          type="text"
          id="title"
          onChange={(e) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <label for="content">content</label>
        <textarea
          id="content"
          onChange={(e) =>
            setData((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <button type="submit">write</button>
      </form>
      <button onClick={() => history.goBack()}>candle</button>
    </div>
  );
}

export default BlogForm;
