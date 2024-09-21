const express = require("express");
const cors = require("cors");
const app = express();
const personasRoutes = require("./routes/personasRoutes");
const equiposRoutes = require("./routes/equiposRoutes");
const detallesRoutes = require("./routes/detallesRoutes");
const administradoresRoutes = require("./routes/administradoresRoutes");
const tecnicosRoutes = require("./routes/tecnicosRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const reporteServiciosRoutes = require("./routes/reporteServiciosRoutes");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.use(cors());

app.use("/personas", personasRoutes);
app.use("/equipos", equiposRoutes);
app.use("/detalles", detallesRoutes);
app.use("/administradores", administradoresRoutes);
app.use("/tecnicos", tecnicosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/reportes", reporteServiciosRoutes);

app.listen(6500, () => {
  console.log("Server is running on port 6500");
});
