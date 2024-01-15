const { Router } = require("express");
const { getClientes, postCliente, putCliente, deleteCliente, getClienteById, getClientesByName } = require("../controllers/cliente");
const router = Router();

router.get("/", getClientes);

router.get("/busqueda/id/:id", getClienteById);

router.get("/busqueda/nombre/:nombre", getClientesByName)

router.post("/", postCliente);

router.put("/:id", putCliente);

router.delete("/:id", deleteCliente);

module.exports = router;