const express = require("express");
const app = express();

app.get("/script.js", (req, res) => {
  const params = req.query;
  const name = params.name || "World";
  const color = params.color || "blue";

  const script = `
    document.body.style.backgroundColor = '${color}';
    console.log('Hello, ${name}!');
  `;

  res.setHeader("Content-Type", "application/javascript");
  res.send(script);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
