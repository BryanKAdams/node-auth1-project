const express = require("express");

const server = express();
server.use(express.json());
const RegisterRouter = require("./register/register-router");
const LoginRouter = require("./login/login-router");
const LogoutRouter = require('./logout/logout-router')
const UsersRouter = require("./users/users-router");
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require('./dbModel/db-config')
const RestrictedRouter = require('./restricted/restricted-router')

const sessionConfig = {
  name: 'The Truth',
  secret: process.env.SESSION_SECRET || "Keep it secret",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, //true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitializied: false, //false legally,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: 'sessions',
    sidfieldname: 'sid',
    clearInterval: 60000,
  })
};

server.use(session(sessionConfig))

server.get("/", (req, res) => {
  res.json({
    message: "yay"
  });
});

server.use("/api/register", RegisterRouter);
server.use("/api/login", LoginRouter);
server.use("/api/logout", LogoutRouter);
server.use("/api/users", UsersRouter);
server.use("/api/restricted", RestrictedRouter)
module.exports = server;
