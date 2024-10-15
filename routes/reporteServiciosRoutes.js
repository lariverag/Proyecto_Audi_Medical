const express = require("express");
const router = express.Router();
const reporteServiciosController = require("../controllers/reporteServiciosController");

router.get("/:id_usuario", reporteServiciosController.consultarDetalle);
router.post("/", reporteServiciosController.ingresar);
router
  .route("/:id")
  //.get(reporteServiciosController.consultarDetalle)
  .put(reporteServiciosController.actualizar)
  .delete(reporteServiciosController.borrar);

module.exports = router;
