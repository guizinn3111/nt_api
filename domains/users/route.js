const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/signup", controller.signUp);

module.exports = router;
