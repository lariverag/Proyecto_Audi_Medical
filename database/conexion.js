const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "820218*.Crear",
  database: "gestion_mantenimiento2",
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Base de Datos Conectada");
  }
});

module.exports = db;
