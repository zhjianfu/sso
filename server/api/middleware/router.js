const { ACCESS_TOKEN_KEY } = require("../../config");
const verifyToken = require("../../middleware/jwt");
const { getCustomer } = require("../handler");

module.exports = function router(app) {
  return function (req, res, next) {
    app.post("/api/customer", verifyToken(ACCESS_TOKEN_KEY), getCustomer);
    next();
  };
};
