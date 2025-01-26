const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/user.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

module.exports = app;
