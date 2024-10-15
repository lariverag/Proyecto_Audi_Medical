// server/routes/auth.routes.js
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/login", authController.login);
router.get("/reportes", authController.verifyToken, (req, res) => {
  res.status(200).send({ message: "Access granted", userId: req.userId });
});

module.exports = router;
