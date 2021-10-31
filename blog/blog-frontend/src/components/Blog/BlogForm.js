import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { _axios } from "../../axios";
import { LoginContext } from "../../auth-context";
import "./BlogForm.css";

function BlogForm() {
  const history = useHistory();
  const ref = useRef();
  // study code : 12
  // business code : 34
  const [data, setData] = useState({
    type: "",
    title: "",
    content: [],
  });

  const [image, setImage] = useState();
  const [content, setContent] = useState("");
  // const [contents, setContents] = useState([]);

  const [file, setFile] = useState(null);

  const { signUser } = useContext(LoginContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      type: data.type,
      title: data.title,
      content: content,
      writer: signUser.user.userid,
    };

    // const images = contents.map((content) => content.image);
    // console.log(images);

    // if (images.length > 0) {
    //   const data = new FormData();

    //   for (let i = 0; i < images.length; i++) {
    //     // const filename = ;
    //     data.append("name", `${Date.now() + images[i].name}`);
    //     data.append("files", images[i]);
    //     newPost.content[i].photo = `${Date.now() + images[i].name}`;
    //   }

    //   try {
    //     await _axios.post("/upload", data);
    //     // console.log(response);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // console.log(newPost);
    // const response = await _axios.post("/blog/write", newPost);
    // console.log(response);

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      // data.append("photo", file);
      newPost.photo = filename;

      try {
        await _axios.post("/upload", data);
      } catch (err) {}
    }
    const response = await _axios.post("/blog/write", newPost);
    history.push("/item/" + response.data._id);
  };

  // const addContent = () => {
  //   const newText = {
  //     content: content,
  //   };

  //   if (image) {
  //     const data = new FormData();
  //     const filename = Date.now() + image.name;
  //     data.append("name", filename);
  //     data.append("photo", image);
  //     newText.photo = filename;
  //     newText.image = image;
  //   }

  //   setContents([...contents, newText]);

  //   // _axios.post("/uploadss", data);

  //   ref.current.value = "";
  //   setImage(null);
  //   setContent("");
  // };

  // const handleChange = (e) => {
  //   const key__index = e.target.parentElement.dataset.key;
  //   const updateContents = contents;
  //   updateContents[key__index].content = e.target.value;
  //   setContents(updateContents);
  // };

  // console.log(contents);

  return (
    <div className="blog__form">
      {/* {file && (
        <img className="write__img" src={URL.createObjectURL(file)} alt="" />
      )} */}
      <form onSubmit={onSubmit}>
        {/* <label htmlFor="fileInput">file</label>
        <input
          type="file"
          name="image"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        /> */}
        <label htmlFor="type">category</label>
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

        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          onChange={(e) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        {/* <textarea
            className="content"
            onChange={(e) =>
              setData((prev) => ({ ...prev, content: e.target.value }))
            }
          /> */}

        {/* {contents?.map((content, index) => (
          <div className="content__preview" key={index} data-key={index}>
            {content.image && (
              <img
                className="write__img"
                src={URL.createObjectURL(content.image)}
                alt="no__image"
              />
            )}
            <textarea
              style={{ whiteSpace: "pre-line" }}
              className="content__textarea"
              onChange={(e) => handleChange(e)}
              defaultValue={content.content}
            />
          </div>
        ))} */}

        {file && (
          <img className="write__img" src={URL.createObjectURL(file)} alt="" />
        )}
        <label htmlFor="fileInput">file</label>
        <input
          type="file"
          name="image"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="content">content</label>
        <textarea
          className="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="btns">
          <button className="btn__write" type="submit">
            write
          </button>
          <button className="btn__cancle" onClick={() => history.goBack()}>
            candle
          </button>
        </div>
      </form>
      {/* <button onClick={addContent}>+</button> */}
    </div>
  );
}

export default BlogForm;
