const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);

  const stmt = `INSERT INTO people (name) VALUES ('Higor Cruz');`;
  connection.query(stmt, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Default data inserted successfully!");
  });
});

app.get("/", (req, res) => {
  const stmt = "SELECT name FROM people;";
  connection.query(stmt, (err, results) => {
    if (err) {
      console.error("Error retrieving data: " + err.stack);
      return;
    }
    const names = results.map((row) => row.name);
    const html = `
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${names.map((name) => `<li>${name}</li>`).join("")}
      </ul>
    `;
    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
