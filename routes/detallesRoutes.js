const express = require("express");
const router = express.Router();
const detallesController = require("../controllers/detallesController");

router.get("/", detallesController.consultar);
router.post("/", detallesController.ingresar);
router
  .route("/:id")
  .get(detallesController.consultarDetalle)
  .put(detallesController.actualizar)
  .delete(detallesController.borrar);

module.exports = router;
