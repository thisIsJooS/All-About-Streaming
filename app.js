const express = require("express");
const nunjucks = require("nunjucks");
const indexRouter = require("./routes/index");
const path = require("path");
const morgan = require("morgan");

const hls = require("./middlewares/hls");
const fs = require("fs");
// const hls = require("hls-server");

const app = express();

app.set("port", process.env.PORT || 8001);
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

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

hls(server);

// new hls(server, {
//   provider: {
//     exists: (req, cb) => {
//       const ext = req.url.split(".").pop();

//       if (ext !== "m3u8" && ext !== "ts") {
//         return cb(null, true);
//       }

//       fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
//         if (err) {
//           console.log("File not exist");
//           return cb(null, false);
//         }
//         cb(null, true);
//       });
//     },
//     getManifestStream: (req, cb) => {
//       const stream = fs.createReadStream(__dirname + req.url);
//       cb(null, stream);
//     },
//     getSegmentStream: (req, cb) => {
//       const stream = fs.createReadStream(__dirname + req.url);
//       cb(null, stream);
//     },
//   },
// });
