const express = require("express");
const cors = require("cors");
const app = express();
const personasRoutes = require("./routes/personasRoutes");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.use("/personas", personasRoutes);

app.listen(6500, () => {
  console.log("Server is running on port 6500");
});
