import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import PostModel from "./Models/PostModel.js";

const app = express();
app.use(express.json());
app.use(cors());

//Database connection

const connectString =
  "mongodb+srv://admin:1234@postitcluster.a7vadki.mongodb.net/postITDb?appName=PostITCluster";

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//POST API for register user
app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name: name,
      email,
      password: hashedpassword,
    });

    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; //using destructuring

    //search the user

    const user = await UserModel.findOne({ email: email });

    //if not found

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }

    console.log(user);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    //if everything is ok, send the user and message

    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;

    const email = req.body.email;

    const post = new PostModel({
      postMsg: postMsg,

      email: email,
    });

    await post.save();

    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
//GET API - getPost

app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order

    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "An error occurred" });
  }
});
//POST API-logout

app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(3001, () => {
  console.log("You are connected");
});
