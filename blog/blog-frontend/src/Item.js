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
  }, []);

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

  const onUpdate = () => setModify(!modify);

  const onDelete = () => {
    _axios
      .get("/blog/delete/" + id)
      .then((response) => {
        // console.log(response);
        history.goBack();
      })
      .catch((err) => console.log(err));
  };

  const handleData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="item">
      {modify ? (
        <button className="btn btn__cancle" onClick={onUpdate}>
          cancle
        </button>
      ) : (
        <>
          {signUser.type === "master" && (
            <>
              <button className="btn btn__modify" onClick={onUpdate}>
                modify
              </button>
              <button className="btn btn__delete" onClick={onDelete}>
                delete
              </button>
            </>
          )}
        </>
      )}
      {modify ? (
        <form onSubmit={onSubmit}>
          <label for="type">type</label>
          <select id="type" name="type" value={data.type} onChange={handleData}>
            <option>select category</option>
            <option value="12">study</option>
            <option value="34">business</option>
          </select>

          <label for="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={data.title}
            onChange={handleData}
          />
          <label for="content">content</label>
          <textarea id="content" name="content" onChange={handleData}>
            {data.content}
          </textarea>

          <button type="submit">update</button>
        </form>
      ) : (
        <div className="item__content">
          {/* {data.type && (
            <span className="item__type">
              {data.type === "12" ? "study" : "business"}
            </span>
          )} */}
          <div className="item__header">
            <h1 className="item__title">{data.title}</h1>
            <span>{data.date?.split("T")[0].replaceAll("-", ".")}</span>
          </div>
          <div className="item__para">
            <p>{data.content}</p>
          </div>
        </div>
      )}

      <Reply id={id} user={signUser.userid} />
    </div>
  );
}

export default Item;
