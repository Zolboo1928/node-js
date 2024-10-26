const { reqDelete, reqGet, reqPost } = require("./functions.js");
const http = require("http");
const fs = require("fs");
let users;
const data = fs.readFileSync("./data.json");
users = JSON.parse(data);

http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    const url = req.url;
    const method = req.method;

    reqPost(method, req, res,users,fs);
    reqDelete(method, req, res,users,fs);
    reqGet(method, req, res,url,users,fs);
    res.end()
  })
  .listen(8080);



