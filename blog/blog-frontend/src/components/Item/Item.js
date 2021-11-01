import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Item.css";
import Reply from "../Reply/Reply";
import { _axios } from "../../axios";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../auth-context";

function Item() {
  const { id } = useParams();
  const [modify, setModify] = useState(false);
  const history = useHistory();
  const { signUser } = useContext(LoginContext);
  const [data, setData] = useState({});

  const PF = "http://localhost:9000/images/";

  useEffect(() => {
    _axios
      .get("/blog/" + id)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

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
          {signUser.user?.type === "master" && (
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
            value={data.title}
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
          <h1 className="item__header">{data.title}</h1>

          <p>{data.writer}</p>
          <span>{data.date?.split("T")[0].replaceAll("-", ".")}</span>
          <img className="item__banner" src={PF + data.photo} alt="" />
          <p>{data.content}</p>
          {/* <div className="item__para"> */}
          {/* {data.content?.map((val) => (
              <>
                <img className="" src={PF + val.photo} alt="" />
                {val.content && <p>{val.content}</p>}
              </>
            ))} */}
          {/* </div> */}
        </div>
      )}
      {/*  */}
      <Reply id={id} user={signUser.user} />
    </div>
  );
}

export default Item;
