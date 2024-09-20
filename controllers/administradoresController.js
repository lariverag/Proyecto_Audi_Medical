const db = require("../database/conexion");

class AdministradoresController {
  constructor() {}

  consultar(req, res) {
    try {
      db.query("SELECT * FROM tbl_administradores", (err, rows) => {
        if (err) {
          res.status(400).send(err);
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  consultarDetalle(req, res) {
    const { id } = req.params;
    try {
      db.query(
        `SELECT * FROM tbl_administradores WHERE id_user = ?`,
        [id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).json(rows);
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  ingresar(req, res) {
    try {
      const { usuario, password } = req.body;
      db.query(
        `INSERT INTO tbl_administradores
              (usuario, password) 
              VALUES (?, ?);`,
        [usuario, password],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).json({ id_user: rows.insertId });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
  actualizar(req, res) {
    const { id } = req.params;
    try {
      const { usuario, password } = req.body;
      db.query(
        `UPDATE tbl_administradores 
        SET usuario= ?, password= ? 
        WHERE id_user = ? `,
        [usuario, password, id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          if (rows.affectedRows == 1)
            res
              .status(200)
              .json({ Respuesta: "Registro Actualizado con exito" });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  borrar(req, res) {
    const { id } = req.params;
    try {
      db.query(
        `DELETE FROM tbl_administradores WHERE id_user = ?`,
        [id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          if (rows.affectedRows == 1)
            res.status(200).json({ Respuesta: "Registro borrado con exito" });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
}

module.exports = new AdministradoresController();
