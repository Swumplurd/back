const { Router } = require("express");
const { getToken } = require("../controllers/auth");
const router = Router()

router.get("/token", getToken)

module.exports = router