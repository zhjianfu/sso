const express = require("express");
const bodyParser = require("body-parser");
const cors = require("../middleware/cors");
const { ALLOW_ORIGINS } = require("../config");
const router = require("./middleware/router");

const app = express();
app.use(bodyParser.json());
app.use(cors(ALLOW_ORIGINS));
app.use(router(app));

app.listen(8080, () => {
  console.log("API Server is running on port 8080");
});
