const { Router } = require("express");
const { getServicios, postServicio, putServicio, deleteServicio, postServicioCompleto, postServicioConClienteExistente, postServicioConClienteMotoExistente, getProximosServicios, getServicioById, getServiciosByMotoId } = require("../controllers/servicio");

const router = Router();

router.get("/", getServicios);

router.get("/busqueda/id/:id", getServicioById)

router.get("/busqueda/moto/:motoid", getServiciosByMotoId)

router.get("/proximos", getProximosServicios)

router.post("/", postServicio);

router.post("/completo", postServicioCompleto);

router.post("/clienteexistente", postServicioConClienteExistente)

router.post("/motoexistente", postServicioConClienteMotoExistente)

router.put("/:id", putServicio);

router.delete("/:id", deleteServicio);

module.exports = router;