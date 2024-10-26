const reqGet = (method, req, res,url,users,fs) => {
  if (method === "GET") {
    if (url === "/users") {
      res.write(JSON.stringify(users));
      res.end();
    } else if (url.startsWith("/users?id=")) {
      res.statusCode = 200;
      const userId = Number(url.split("=")[1]);
      const user = users.filter((item) => item.id == userId);
      if (user.length > 0) {
        res.write(JSON.stringify(user));
        res.end();
      } else {
        res.write(JSON.stringify({ message: "user not found" }));
        res.end();
      }
    } else {
      res.write(JSON.stringify({ message: "wrong address" }));
      res.end();
    }
  }
};


const reqPost = (method, req, res,users,fs) => {
  if (method === "POST") {
    let jsonNewUser = "";
    req.on("data", (buffer) => {
      jsonNewUser += buffer;
    });
    req.on("end", () => {
      const parsedUser = JSON.parse(jsonNewUser);
      const newUser = {
        id: users.length + 1,
        ...parsedUser,
      };
      users.push(newUser);
      fs.writeFile("data.json", JSON.stringify(users), (err) =>
        console.log(err)
      );
      res.write(JSON.stringify({ message: "done" }));
      res.end();
    });
  }
};


const reqDelete = (method,req,res,users,fs) => {
  if (method === "DELETE") {
    let jsonIdObj = "";
    req.on("data", (buffer) => (jsonIdObj += buffer));
    req.on("end", () => {
      const parsedIdObj = JSON.parse(jsonIdObj);
      const deleteItemId = parsedIdObj.id;
      const safeItem = users.filter(
        (item) => Number(item.id) !== Number(deleteItemId)
      );
      fs.writeFile("data.json", JSON.stringify(safeItem), (err) =>
        console.log(err)
      );
       console.log("done")
      res.end();
    });
  }
};

module.exports = { reqGet, reqDelete, reqPost };