const express = require("express");
const nunjucks = require("nunjucks");
const indexRouter = require("./routes/index");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.set("port", process.env.PORT || 8000);
app.set("view engine", "njk");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  res.status(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
