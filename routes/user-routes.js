let express = require("express");
let userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/create", userController.createUser);

module.exports = router;