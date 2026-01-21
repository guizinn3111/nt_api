const { Router } = require("express");
const controller = require("./controler");

const router = Router();

router.post("/signin", controller.signIn);

module.exports = router;
