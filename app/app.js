const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url} from ${req.ip}`);
  next();
});

//Route
app.get("/", (req, res) => {
  res.json({
    message: "DevSecOps AWS Project - Ben Swissa",
    status: "OK",
    host: os.hostname(),
    time: new Date().toISOString(),
  });
});

//healthcheck to Route
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
