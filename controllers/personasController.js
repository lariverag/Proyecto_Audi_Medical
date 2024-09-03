const db = require("../database/conexion");

class PersonasController {
  constructor() {}

  consultar(req, res) {
    try {
      db.query("SELECT * FROM tbl_personas", (err, rows) => {
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
        `SELECT * FROM tbl_personas WHERE id_persona = ?`,
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
      const {
        nombre,
        apellido,
        correo,
        cedula,
        rol,
        password,
        usuario_creador,
        fecha_creacion,
      } = req.body;
      db.query(
        `INSERT INTO tbl_personas 
              (nombre, apellido, correo, cedula, rol, password, usuario_creador, fecha_creacion) 
              VALUES (?, ?, ?, ?, ?, ?, ?, NOW());`,
        [
          nombre,
          apellido,
          correo,
          cedula,
          rol,
          password,
          usuario_creador,
          fecha_creacion,
        ],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).json({ id_persona: rows.insertId });
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
      const {
        nombre,
        apellido,
        correo,
        cedula,
        rol,
        password,
        usuario_creador,
      } = req.body;
      db.query(
        `UPDATE tbl_personas 
        SET nombre= ?, apellido= ?, correo= ?, cedula= ?, rol= ?, password= ?, usuario_creador= ? 
        WHERE id_persona = ? `,
        [nombre, apellido, correo, cedula, rol, password, usuario_creador, id],
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
        `DELETE FROM tbl_personas WHERE id_persona = ?`,
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

module.exports = new PersonasController();
