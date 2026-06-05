const apiClient = require("../config/apiClient");
const { DEPOT_API_URL } = require("../config/env");
const { Log } = require("../logging_middleware/logger");
async function fetchDepotData() {
  try {
    const response = await apiClient.get(DEPOT_API_URL);
    Log("backend", "info", "repository", "Fetched depot data successfully");
    return response.data;
  } catch (err) {
    Log("backend", "error", "repository", "Failed to fetch depot data");
    throw err;
  }
}
function scheduleTasks(tasks, maxHours) {
  if (!Array.isArray(tasks)) {
    throw new TypeError("tasks must be an array");
  }
  if (!Number.isInteger(maxHours) || maxHours < 0) {
    throw new TypeError("maxHours must be a non-negative integer");
  }

  const n = tasks.length;
  const dp = Array.from({ length: n + 1 }, () => Array(maxHours + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const { duration, score } = tasks[i - 1];
    for (let h = 0; h <= maxHours; h++) {
      if (duration <= h) {
        dp[i][h] = Math.max(dp[i - 1][h], dp[i - 1][h - duration] + score);
      } else {
        dp[i][h] = dp[i - 1][h];
      }
    }
  }
  let selected = [];
  let h = maxHours;
  for (let i = n; i > 0; i--) {
    if (dp[i][h] !== dp[i - 1][h]) {
      selected.push(tasks[i - 1]);
      h -= tasks[i - 1].duration;
    }
  }
  Log("backend", "info", "service", `Scheduled ${selected.length} tasks`);
  return selected.reverse();
}
module.exports = { fetchDepotData, scheduleTasks };