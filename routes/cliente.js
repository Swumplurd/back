const { Router } = require("express");
const { getClientes, postCliente, putCliente } = require("../controllers/cliente");
const router = Router();

router.get("/", getClientes);

router.post("/", postCliente);

router.put("/:id", putCliente);

module.exports = router;