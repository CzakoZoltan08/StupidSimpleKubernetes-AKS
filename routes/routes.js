var express = require("express");
var userRoutes = require("./user-routes");

var router = express.Router();

router.get("/", function(req, res) {
  res.send("Home");
});

router.use("/users", userRoutes);

module.exports = router;
