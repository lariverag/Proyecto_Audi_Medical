const db = require("../database/conexion");
const { actualizar } = require("./personasController");

class EquiposController {
  constructor() {}

  consultar(req, res) {
    try {
      db.query(`SELECT * FROM tbl_equipos`, (err, rows) => {
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
        `SELECT * FROM tbl_equipos WHERE id_equipo = ?`,
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
      const { nombre_equipo, tipo, fecha_adquisicion, fecha_creacion } =
        req.body;
      db.query(
        `INSERT INTO tbl_equipos (nombre_equipo, tipo, fecha_adquisicion, fecha_creacion)
        VALUES (?, ?, ?, NOW());`,
        [nombre_equipo, tipo, fecha_adquisicion, fecha_creacion],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).json({ id_equipo: rows.insertId });
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
      const { nombre_equipo, tipo, fecha_adquisicion } = req.body;
      db.query(
        `UPDATE tbl_equipos 
        SET nombre_equipo= ?, tipo= ?, fecha_adquisicion= ? 
        WHERE id_equipo = ?`,
        [nombre_equipo, tipo, fecha_adquisicion, id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          if (rows.affectedRows == 1)
            res.status(200).json({ message: "Registro actualizado con exito" });
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
        `DELETE FROM tbl_equipos WHERE id_equipo = ?`,
        [id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          if (rows.affectedRows == 1)
            res.status(200).json({ message: "Registro eliminado con exito" });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
}

module.exports = new EquiposController();
