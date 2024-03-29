const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const apiRouter = require("./routes/api/api");
const { nextTick } = require("process");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
//Implementacion de Sesiones para poder enviar mensajes entre rutas (endpoints)
app.use(cookieParser());
app.use(
  session({
    secret: "libr@pp-Aplic@tion",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api", apiRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //cors
  // app.use(cors());




  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
