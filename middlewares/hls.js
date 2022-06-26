const fs = require("fs");
const hls = require("hls-server");
const path = require("path");

const HLS = function (server) {
  return new hls(server, {
    provider: {
      exists: (req, cb) => {
        // hls 미들웨어가 삽입된 서버에서 요청이 올 때마다 호출되는 함수
        const ext = req.url.split(".").pop();

        if (ext !== "m3u8" && ext !== "ts") {
          return cb(null, true);
        }

        const filePath = path.join(__dirname, "..", "public", req.url);

        fs.access(filePath, fs.constants.F_OK, function (err) {
          console.log(filePath);
          if (err) {
            console.log("File not exist");
            return cb(null, false);
          }
          cb(null, true); // 파일이 존재하고 스트리밍을 할 경우 호출하는 출력
        });
      },

      getManifestStream: (req, cb) => {
        const filePath = path.join(__dirname, "..", "public", req.url);
        const stream = fs.createReadStream(filePath);
        cb(null, stream);
      },

      getSegmentStream: (req, cb) => {
        const filePath = path.join(__dirname, "..", "public", req.url);
        const stream = fs.createReadStream(filePath);
        cb(null, stream);
      },
    },
  });
};

module.exports = HLS;
