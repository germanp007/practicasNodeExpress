import express from "express";
import path from "path";
import { __dirname } from "./utils.js";
import { petRouter } from "./routes/mascotas.routes.js";
import { usersRouter } from "./routes/usuarios.routes.js";
const app = express();

app.listen(8080, () => {
  console.log("Server is running");
});

app.use(express.static(path.join(__dirname, "/public"))); // Para agregar ruta dinamica
app.use(express.json()); // Para leer formato JSON entrantes 
app.use(express.urlencoded({ extended: true })); // Para  analizar el cuerpo de las solicitudes con datos de formulario

app.use("/api/mascotas", petRouter);
app.use("/api/usuarios", usersRouter);
