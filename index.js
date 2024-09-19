const express = require("express");
const cors = require("cors");
const app = express();
const personasRoutes = require("./routes/personasRoutes");
const equiposRoutes = require("./routes/equiposRoutes");
const detallesRoutes = require("./routes/detallesRoutes");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.use(cors());

app.use("/personas", personasRoutes);
app.use("/equipos", equiposRoutes);
app.use("/detalles", detallesRoutes);

app.listen(6500, () => {
  console.log("Server is running on port 6500");
});
