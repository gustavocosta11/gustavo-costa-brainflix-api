const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 9999;

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users");

app.use("/", userRoutes);
app.use("/images", express.static("./public/images"));

app.listen(PORT, function () {
  console.log("App running on 9999 server.");
});
