const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg("../public/video/mindley.mp4", { timeout: 432000 })
  .addOptions([
    "-profile:v baseline",
    "-level 3.0",
    "-start_number 0",
    "-hls_time 10", // 몇 초 단위로 동영상을 분할할 것인지 설정. 여기서는 10초
    "-hls_list_size 0",
    "-f hls", // 포맷 설정. 여기서는 hls
  ])
  .output("../public/video/mindley.m3u8")
  .on("end", () => {
    console.log("end");
  })
  .run();
