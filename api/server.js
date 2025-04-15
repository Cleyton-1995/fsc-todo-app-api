const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();

const filePath = path.join(__dirname, "db.json");
const middlewares = jsonServer.defaults();
server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.delete("/tasks", (req, res) => {
  const dbData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  dbData.tasks = [];

  fs.writeFileSync(filePath, JSON.stringify(dbData, null, 2), "utf-8");

  res.status(204).send();
});

const router = jsonServer.router(filePath);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

module.exports = server;
