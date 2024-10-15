const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database/conexion");
const SECRET_KEY = "loroviejonoaprendehablar";

class AuthController {
  async login(req, res) {
    const { correo, password } = req.body;

    try {
      // Verificar si el usuario existe
      db.query(
        "SELECT * FROM tbl_usuarios WHERE correo = ?",
        [correo],
        (err, rows) => {
          if (err) {
            return res.status(400).send(err);
          }

          const user = rows[0];
          if (!user) {
            return res.status(404).send({ message: "User not found" });
          }

          // Verificar la contraseña con bcrypt
          const passwordIsValid = bcrypt.compareSync(password, user.password);
          if (!passwordIsValid) {
            return res
              .status(401)
              .send({ auth: false, token: null, message: "Invalid password" });
          }

          // Generar token JWT
          const token = jwt.sign({ id: user.id_persona }, SECRET_KEY, {
            expiresIn: 86400, // 24 horas
          });

          res.status(200).send({ auth: true, token });
        }
      );
    } catch (error) {
      res.status(500).send({ message: "Error during login", error });
    }
  }

  // Middleware para verificar el token
  verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }

      req.userId = decoded.id;
      next();
    });
  }
}

module.exports = new AuthController();
