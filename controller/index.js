const multiparty = require("multiparty");
const fs = require("fs");

exports.home = function (req, res, next) {
  try {
    console.log(__dirname, req.url);
    return res.render("home");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.s1 = function (req, res, next) {
  try {
    res.render("service1");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.s2 = function (req, res, next) {
  try {
    res.render("service2");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.s3 = function (req, res, next) {
  try {
    res.render("service3");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// http://localhost:8000/s4?file=seoul.mp3
exports.s4_GET = function (req, res, next) {
  try {
    const filename = req.query.file;
    const filepath = `./resource/${filename}`;

    const stat = fs.statSync(filepath); // 파일의 여러 정보를 가져온다. - 크기, 생성날짜, 수정날짜
    const fileSize = stat.size; // 파일의 크기를 가져와 저장한다.
    const range = req.headers.range; // bytes=<시작점>-<끝점>

    if (!range) {
      const header = { "Content-Type": "audio/mpeg" };
      res.writeHead(200, header);
      res.end();
    } else {
      // range 헤더 파싱
      const parts = range.replace(/bytes=/, "").split("-");
      // 재생 구간 설정
      const start = parseInt(parts[0], 10);

      const MAX_CHUNK_SIZE = 1000 * 1000;
      const _end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const end = Math.min(_end, start + MAX_CHUNK_SIZE - 1);

      const header = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes", // 미디어 파일을 구간별로 쪼개어 요철할 수 있게 함. 즉, 스킵 가능토록함
        "Content-Type": "audio/mpeg",
        "Content-Length": fileSize - 1, // 파일의 전체 길이를 클라이언트에게 알려준다.
      };
      res.writeHead(206, header); // 206은 Partial Content를 의미하는 status로 데이터가 여럿으로 쪼개졌을 떄 다음 데이터가 존재한다고 알려주는 역할을 한다.

      const readStream = fs.createReadStream(filepath, { start, end });
      readStream.pipe(res);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.s4_upload = function (req, res) {
  const body = `
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>
    <body>
        <form action="/s4" enctype="multipart/form-data" method="post">
            <input type="file" name="file1" multiple="multiple">
            <input type="submit" value="Upload file" />
        </form>
    </body>
    </html>
    `;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(body);
  res.end();
};

exports.s4_POST = function (req, res, next) {
  try {
    const form = new multiparty.Form();
    form.on("error", (err) => res.status(500).end());
    form.on("part", (part) => {
      // file이 아닌 경우 skip
      if (!part.filename) {
        return part.resume();
      }
      const filestream = fs.createWriteStream(`./resource/${part.filename}`);
      part.pipe(filestream);
    });
    form.on("close", () => res.end());
    form.parse(req);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
