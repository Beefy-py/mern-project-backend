const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const posts = require("./routes/posts");
const users = require("./routes/users");

require("dotenv").config();

const app = express();

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.use("/users", users);
app.use("/posts", posts);
app.get("/", (req, res) => {
  res.send("Backend Server for https://poster-mern.netlify.app/");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`The server is running on port:${PORT}`))
  )
  .catch((err) => console.log(err.message));
