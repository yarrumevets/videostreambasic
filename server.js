const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const config = require("./config.json");
const port = config.port;

// Get videos from webserver assets folder
app.get("/dir", (req, res) => {
  providedPath = req.query.path;
  let filePath = "public/assets";
  if (providedPath) {
    filePath = `${filePath}/${providedPath}`;
  }
  const directoryPath = path.join(__dirname, filePath);
  const dirList = [];
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("FS Error: " + err);
    }
    files.forEach(function (file) {
      if (file[0] === ".") return; // ignore hidden files.
      const filePath = path.join(directoryPath, file);
      dirList.push({
        file,
        isDir: fs.statSync(filePath).isDirectory(),
      });
    });
    res.send(dirList);
  });
});

app.use("/", express.static(__dirname + "/public"));

// Start server
app.listen(port, function () {
  console.log("Video server running on " + port + "...");
});
