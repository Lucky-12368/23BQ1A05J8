const express = require("express");
const { Log } = require("../logging_middleware/logger");
const router = express.Router();
router.post("/", async (req, res) => {
  const { stack, level, pkg, message } = req.body;
  try {
    await Log(stack, level, pkg, message);
    res.json({ status: "logged" });
  } catch {
    res.status(500).json({ error: "Failed to log" });
  }
});
module.exports = router;