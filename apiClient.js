const axios = require("axios");
const { AUTH_TOKEN } = require("./env");
const apiClient = axios.create({
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    "Content-Type": "application/json"
  }
});
module.exports = apiClient;