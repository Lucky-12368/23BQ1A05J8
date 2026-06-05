require("dotenv").config();
module.exports = {
  AUTH_TOKEN: process.env.AUTH_TOKEN || "",
  LOG_API_URL: process.env.LOG_API_URL || "",
  DEPOT_API_URL: process.env.DEPOT_API_URL || ""
};
