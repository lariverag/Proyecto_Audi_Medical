const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "b31udvkywxm5uacysfbk-mysql.services.clever-cloud.com",
  user: "utbrnbgikbuojsnp",
  password: "kekLz9ZQXEMGMHWSlN3V",
  database: "b31udvkywxm5uacysfbk",
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Base de Datos Conectada");
  }
});

module.exports = db;
