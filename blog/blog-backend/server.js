import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import cors from "cors";
import Blog from "./blog.js";
import Reply from "./reply.js";
import User from "./user.js";

import validation from "./validation.js";
import jwt from "jsonwebtoken";

// app config

const app = express();
const PORT = process.env.PORT || 9000;
dotenv.config();

const __dirname = path.resolve();

// db config
const DBURL = `mongodb+srv://admin:tuzUfVHxaBWmptDY@cluster0.7xk0i.mongodb.net/blog?retryWrites=true&w=majority`;

mongoose.connect(DBURL).then(() => console.log("DB connected"));

// middleware
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("upload requst");
  res.status(200).json("file has benn uploaded");
});

// app.post("/upload", upload.array("files"), (req, res) => {
//   console.log("upload requst");
//   console.log(req.files);
//   res.status(200).json("file has benn uploaded");
// });

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
  const { userid, password } = req.body;

  User.findOne({ userid }, (err, data) => {
    if (err) {
      res.status(500).send("user not found");
    }

    if (data.password === password) {
      const accessToken = jwt.sign(
        { type: data.type, userid: data.userid },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({ accessToken });
    } else {
      res.status(500).json({ message: "password not same" });
    }
  });
});

app.post("/user/token", (req, res) => {
  const { token } = req.body;
  jwt.verify(
    JSON.parse(token),
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.status(403);
      res.json({ userid: user.userid, userType: user.type });
    }
  );
});

app.post("/user/signup", (req, res) => {
  const { userid, password } = req.body;
  const [id, code] = userid.split("#");

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

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.user = user;
    next();
  });
}

// listner
app.listen(PORT, () => console.log(`server is running on ${PORT} port`));
