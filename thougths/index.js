const handlebar = require("express-handlebars");
const session = require("express-session");
const express = require("express");
const flash = require("express-flash");
const fileStore = require("session-file-store")(session);

const conn = require("./db/conn");

const app = express();

// template
app.engine("handlebars", handlebar.engine());
app.set("view engine", "handlebars");

// json
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// session
app.use(
  session({
    name: "session",
    secret: "express",
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
      logFn: function () { },
      path: require("path").join(require("os").tmpdir()),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      httpOnly: false,
    },
  }),
);

app.use(flash());

app.use(express.static("public"));

// session to res
app.use((req, res, next) => {
  // @ts-ignore
  if (req.session.userId) {
    res.locals.session = req.session;
  }
  next();
});

// models
const User = require("./model/User.js");
const Tought = require("./model/Tought.js");

// routes
const indexRouter = require("./routes/index.js");
const toughtRouter = require("./routes/tougthsRoute.js");
const authRouter = require("./routes/authRoutes.js");
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/toughts", toughtRouter);

// index
app.get("/", (req, res) => {
  res.render("home");
});

conn.sync({}).then(() => {
  app.listen(3000, () => {
    console.log("\n\n Rodando em http://localhost:3000");
  });
});
