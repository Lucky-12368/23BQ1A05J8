const express = require("express");
const logsRouter = require("./routes/logs");
const depotsRouter = require("./routes/depots");
const app = express();
app.use(express.json());
app.use("/logs", logsRouter);
app.use("/depots", depotsRouter);
const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Please stop the process using the port or change the PORT value.`);
    process.exit(1);
  }
  throw err;
});