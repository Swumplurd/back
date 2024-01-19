const { Router } = require("express");
const { getClientes, postCliente, putCliente, deleteCliente, getClienteById, getClientesByName } = require("../controllers/cliente");
const { param } = require("express-validator");
const validarCampos = require("../middlewares/validarCampos");
const clienteValidation = require("../validations/clienteValidation");
const router = Router();

router.get("/", getClientes);

router.get("/busqueda/id/:id", getClienteById);

router.get("/busqueda/nombre/:nombre", getClientesByName)

router.post("/", [...clienteValidation, validarCampos], postCliente);

router.put("/:id", [
    param("id", "el id no es valido").isMongoId(),
    ...clienteValidation,
    validarCampos
], putCliente);

router.delete("/:id", deleteCliente);

module.exports = router;