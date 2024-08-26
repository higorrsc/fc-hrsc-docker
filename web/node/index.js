const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const config = {
  host: "db-mysql",
  user: "root",
  password: "root",
  database: "challengedb",
};
const connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

const stmt = `INSERT INTO people (name) VALUES ('Higor Cruz');`;
connection.query(stmt);
let names;
const query = "SELECT name FROM people";
connection.query(query, (err, results) => {
  if (err) {
    console.error(err);
    return;
  }
  names = results.map((row) => row.name);
});
connection.end();

app.get("/", (req, res) => {
  const htmlResult =
    `<h1>Full Cycle Rocks!</h1>` +
    names.map((name) => `<p>${name}</p>`).join("");
  res.send(htmlResult);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
