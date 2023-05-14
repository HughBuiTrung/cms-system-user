const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// routes
const todosRoutes = require("./routes/users");

dotenv.config();
app.use(cors());
app.use(express.static("public"));

// connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Connect Fail: ", error));

// get
app.use(express.json({ extend: true }));
app.get("/", (_, res) => res.send("API user running..."));

// routes
app.use("/api/user", todosRoutes);

// listen apps
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
