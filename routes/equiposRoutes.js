const express = require("express");
const router = express.Router();
const equiposController = require("../controllers/equiposController");

router.get("/", equiposController.consultar);
router.post("/", equiposController.ingresar);
router
  .route("/:id")
  .get(equiposController.consultarDetalle)
  .put(equiposController.actualizar)
  .delete(equiposController.borrar);

module.exports = router;
