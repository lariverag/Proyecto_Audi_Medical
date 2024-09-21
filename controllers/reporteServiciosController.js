const db = require("../database/conexion");

class ReporteServiciosController {
  constructor() {}

  consultar(req, res) {
    try {
      db.query(`SELECT * FROM tbl_reporte_servicio`, (err, rows) => {
        if (err) {
          res.status(400).send(err);
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }

  consultarDetalle(req, res) {
    const { id } = req.params;
    try {
      db.query(
        `SELECT * FROM tbl_reporte_servicio WHERE id_reporte = ?`,
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
        id_usuario,
        id_tecnico,
        fecha_recepcion,
        fecha_servicio,
        fecha_salida,
        cliente,
        direccion_cliente,
        numero_reporte,
        tipo_equipo,
        marca,
        modelo,
        serie,
        ubicacion,
        identificacion_dano,
        descripcion_dano,
        tipo_mantenimiento,
        procedimiento_realizado,
        observaciones,
        elaborado_por,
        responsable_equipo,
      } = req.body;
      db.query(
        `INSERT INTO tbl_reporte_servicio 
          (id_usuario, id_tecnico, fecha_recepcion, fecha_servicio, fecha_salida, cliente, direccion_cliente, numero_reporte, tipo_equipo, marca, modelo, serie, ubicacion, identificacion_dano, descripcion_dano, tipo_mantenimiento, procedimiento_realizado, observaciones, elaborado_por, responsable_equipo) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          id_usuario,
          id_tecnico,
          fecha_recepcion,
          fecha_servicio,
          fecha_salida,
          cliente,
          direccion_cliente,
          numero_reporte,
          tipo_equipo,
          marca,
          modelo,
          serie,
          ubicacion,
          identificacion_dano,
          descripcion_dano,
          tipo_mantenimiento,
          procedimiento_realizado,
          observaciones,
          elaborado_por,
          responsable_equipo,
        ],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).json({ id_reporte: rows.insertId });
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
        id_usuario,
        id_tecnico,
        fecha_recepcion,
        fecha_servicio,
        fecha_salida,
        cliente,
        direccion_cliente,
        numero_reporte,
        tipo_equipo,
        marca,
        modelo,
        serie,
        ubicacion,
        identificacion_dano,
        descripcion_dano,
        tipo_mantenimiento,
        procedimiento_realizado,
        observaciones,
        elaborado_por,
        responsable_equipo,
      } = req.body;
      db.query(
        `UPDATE tbl_reporte_servicio 
        SET id_usuario= ?, id_tecnico= ?, fecha_recepcion= ?, fecha_servicio= ?, fecha_salida= ?, cliente= ?, direccion_cliente= ?, numero_reporte= ?,    tipo_equipo= ?, marca= ?, modelo= ?, serie= ?, ubicacion= ?, identificacion_dano= ?, descripcion_dano= ?, tipo_mantenimiento= ?, procedimiento_realizado= ?, observaciones= ?, elaborado_por= ?, responsable_equipo= ? 
        WHERE id_reporte= ?; `,
        [
          id_usuario,
          id_tecnico,
          fecha_recepcion,
          fecha_servicio,
          fecha_salida,
          cliente,
          direccion_cliente,
          numero_reporte,
          tipo_equipo,
          marca,
          modelo,
          serie,
          ubicacion,
          identificacion_dano,
          descripcion_dano,
          tipo_mantenimiento,
          procedimiento_realizado,
          observaciones,
          elaborado_por,
          responsable_equipo,
          id,
        ],
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
        `DELETE FROM tbl_reporte_servicio WHERE id_reporte = ?`,
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

module.exports = new ReporteServiciosController();
