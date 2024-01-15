const { Router } = require("express");
const { getMotos, getMotoById, getMotosByCliente, postMoto, putMoto, deleteMoto } = require("../controllers/moto");
const router = Router();

router.get("/", getMotos);

router.get("/busqueda/id/:id", getMotoById);

router.get("/busqueda/cliente/:cliente", getMotosByCliente)

router.post("/", postMoto);

router.put("/:id", putMoto);

router.delete("/:id", deleteMoto);

module.exports = router;