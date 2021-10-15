import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Item.css";
import Reply from "./Reply";
import { _axios } from "./axios";
import { useHistory } from "react-router-dom";
import { LoginContext } from "./auth-context";

function Item() {
  const { id } = useParams();
  const [modify, setModify] = useState(false);
  const history = useHistory();
  const { signUser } = useContext(LoginContext);

  const [data, setData] = useState({
    type: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    _axios
      .get("/blog/" + id)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    _axios
      .post("/blog/update", { id, ...data })
      .then((response) => {
        setData(response.data);
        setModify(false);
      })
      .catch((err) => console.log(err));
  };

  const onDelete = () => {
    _axios
      .get("/blog/delete/" + id)
      .then((response) => {
        // console.log(response);
        history.goBack();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="item">
      {modify ? (
        <button onClick={() => setModify(!modify)}>cancle</button>
      ) : (
        <>
          {signUser.type === "master" && (
            <>
              <button onClick={() => setModify(!modify)}>modify</button>
              <button onClick={onDelete}>delete</button>
            </>
          )}
        </>
      )}
      {modify ? (
        <form onSubmit={onSubmit}>
          <label for="type">type</label>
          <select
            id="type"
            defaultValue={data.type}
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
            defaultValue={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <label for="content">content</label>
          <textarea
            id="content"
            defaultValue={data.content}
            onChange={(e) =>
              setData((prev) => ({ ...prev, content: e.target.value }))
            }
          />

          <button type="submit">update</button>
        </form>
      ) : (
        <div className="item__content">
          <h1 className="item__title">{data.title}</h1>
          <span>{data.date}</span>
          <div className="item__para">
            <img
              src="https://www.imgworlds.com/wp-content/uploads/2016/12/to-post.jpg"
              alt=""
            />
            <p>{data.content}</p>
          </div>
        </div>
      )}

      <Reply id={id} user={signUser.userid} />
    </div>
  );
}

export default Item;
