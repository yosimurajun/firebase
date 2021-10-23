import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Blog from "./blog.js";
import Reply from "./reply.js";
import User from "./user.js";

import validation from "./validation.js";

// app config

const app = express();
const PORT = process.env.PORT || 9000;

// google auth

// db config
const URL = `mongodb+srv://admin:tuzUfVHxaBWmptDY@cluster0.7xk0i.mongodb.net/blog?retryWrites=true&w=majority`;

mongoose.connect(URL).then(() => console.log("DB connected"));

// middleware
app.use(express.json());
app.use(cors());

// route
app.get("/", (req, res) => res.status(200).send("Hello Server Master"));

// login
app.post("/login/", (req, res) => {
  const login__data = req.body;

  const fake__credit = { id: "harrypotter", password: "123456" };

  if (fake__credit.id === login__data.id) {
    if (fake__credit.password === login__data.password) {
      res.status(200).send("login success");
    } else {
      res.status(500).send("password fail");
    }
  } else {
    res.status(500).send("not found id");
  }
});

// user
app.get("/user/getall", (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/user/signin", (req, res) => {
  const user__data = req.body;
  // console.log(user__data);
  const validation_result = validation(user__data);
  if (validation_result.error) {
    res.status(500).send(validation_result.message);
    return;
  }

  User.findOne({ userid: user__data.userid }, (err, data) => {
    if (err) {
      res.status(500).send("user not found");
    } else {
      //   console.log(typeof data.password, typeof password);
      if (data.password === user__data.password) {
        res.status(200).send(data);
      } else {
        res.status(500).send("password not same");
      }
    }
  });
});

app.post("/user/signup", (req, res) => {
  const { userid, password } = req.body;
  const [id, code] = userid.split("#");
  const validation_result = validation({ userid, password });

  if (validation_result.error) {
    res.status(500).send(validation_result.message);
    return;
  }

  if (code === "a1b2c3") {
    User.create({ type: "master", userid: id, password }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } else {
    User.create({ userid, password }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  }
});

// blog
app.get("/blog/all", (req, res) => {
  Blog.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/blog/:id", (req, res) => {
  const blog_id = req.params.id;
  Blog.findOne({ _id: blog_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/blog/write", (req, res) => {
  const blog__data = req.body;

  // const validation_result = validation(blog__data);
  // if (validation_result.error) {
  //   res.status(500).send(validation_result.message);
  //   return;
  // }

  Blog.create(blog__data, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/blog/update", (req, res) => {
  const blog__data = req.body;
  // console.log(blog__data);

  // const validation_result = validation(blog__data);
  // if (validation_result.error) {
  //   res.status(500).send(validation_result.message);
  //   return;
  // }

  Blog.findById({ _id: blog__data.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.type = blog__data.type;
      data.title = blog__data.title;
      data.content = blog__data.content;
      data.save();
      res.status(200).send(data);
    }
  });
});

app.get("/blog/delete/:id", (req, res) => {
  const id = req.params.id;
  // console.log(blog__data);

  // const validation_result = validation(blog__data);
  // if (validation_result.error) {
  //   res.status(500).send(validation_result.message);
  //   return;
  // }

  Blog.findByIdAndDelete({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("delete");
    }
  });
});

// reply

app.get("/reply/:id", (req, res) => {
  const content_id = req.params.id;
  Reply.find({ content_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/reply/write", (req, res) => {
  const reply__data = req.body;

  // const validation_result = validation(reply__data);
  // if (validation_result.error) {
  //   res.status(500).send(validation_result.message);
  //   return;
  // }

  Reply.create(reply__data, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/reply/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  Reply.findByIdAndDelete({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("delete");
    }
  });
});

// listner
app.listen(PORT, () => console.log(`server is running on ${PORT} port`));
