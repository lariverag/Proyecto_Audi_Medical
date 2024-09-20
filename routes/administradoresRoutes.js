const express = require("express");
const router = express.Router();
const administradoresController = require("../controllers/administradoresController");

router.get("/", administradoresController.consultar);
router.post("/", administradoresController.ingresar);
router
  .route("/:id")
  .get(administradoresController.consultarDetalle)
  .put(administradoresController.actualizar)
  .delete(administradoresController.borrar);

module.exports = router;
