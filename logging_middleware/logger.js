const apiClient = require("../config/apiClient");
const { LOG_API_URL } = require("../config/env");
async function Log(stack, level, pkg, message) {
  try {
    await apiClient.post(LOG_API_URL, { stack, level, package: pkg, message });
    console.log(`[${level.toUpperCase()}] ${pkg}: ${message}`);
  } catch (err) {
    console.error("Failed to send log:", err.message);
  }
}
module.exports = { Log };