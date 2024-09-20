const express = require("express");
const router = express.Router();
const tecnicosController = require("../controllers/tecnicosController");

router.get("/", tecnicosController.consultar);
router.post("/", tecnicosController.ingresar);
router
  .route("/:id")
  .get(tecnicosController.consultarDetalle)
  .put(tecnicosController.actualizar)
  .delete(tecnicosController.borrar);

module.exports = router;
