const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.get("/", usuariosController.consultar);
router.post("/", usuariosController.ingresar);
router
  .route("/:id")
  .get(usuariosController.consultarDetalle)
  .put(usuariosController.actualizar)
  .delete(usuariosController.borrar);

module.exports = router;
