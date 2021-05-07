const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const userRouter = require("./routes/user.js");
const contestRouter = require("./routes/contest.js");

app.use("/user", userRouter);
app.use("/contest", contestRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("Frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
