const express = require("express");
const apiClient = require("../config/apiClient");
const { DEPOT_API_URL } = require("../config/env");
const router = express.Router();
router.get("/", async (_req, res) => {
  try {
    const response = await apiClient.get(DEPOT_API_URL);
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Failed to fetch depots" });
  }
});
module.exports = router;