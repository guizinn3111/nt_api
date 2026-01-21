const express = require("express");
require("./database");

const usersRoutes = require("./domains/users/route");
const authRoutes = require("./domains/auth/routess");

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

module.exports = app;



