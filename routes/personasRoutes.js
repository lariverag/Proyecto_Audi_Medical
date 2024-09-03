const express = require("express");
const router = express.Router();
const personasController = require("../controllers/personasController");

router.get("/", personasController.consultar);
router.post("/", personasController.ingresar);
router
  .route("/:id")
  .get(personasController.consultarDetalle)
  .put(personasController.actualizar)
  .delete(personasController.borrar);

module.exports = router;
