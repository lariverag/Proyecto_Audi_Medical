const db = require("../database/conexion");

class DetallesController {
  constructor() {}

  consultar(req, res) {
    try {
      db.query(`SELECT * FROM tbl_detalle;`, (err, rows) => {
        if (err) {
          res.status(400).send(err);
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  }

  consultarDetalle(req, res) {
    const { id } = req.params;
    try {
      db.query(
        `SELECT * FROM tbl_detalle WHERE id_detalle = ?;`,
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
      res.status(500).json(err.message);
    }
  }

  ingresar(req, res) {
    try {
      const { id_persona, id_equipo, fecha_asignacion } = req.body;
      db.query(
        `INSERT INTO tbl_detalle 
              (id_persona, id_equipo, fecha_asignacion)
              VALUES ( ?, ?, NOW());`,
        [id_persona, id_equipo, fecha_asignacion],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).json({ id_detalle: rows.insertId });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  }

  actualizar(req, res) {
    const { id } = req.params;
    try {
      const { id_persona, id_equipo } = req.body;
      db.query(
        `UPDATE tbl_detalle 
        SET id_persona= ?, id_equipo= ? 
        WHERE id_detalle = ?`,
        [id_persona, id_equipo, id],
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
      res.status(500).json(err.message);
    }
  }

  borrar(req, res) {
    const { id } = req.params;
    try {
      db.query(
        `DELETE FROM tbl_detalle WHERE id_detalle = ?`,
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
      res.status(500).json(err.message);
    }
  }
}

module.exports = new DetallesController();
