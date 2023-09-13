import express from "express";
import { petRouter } from "./routes/mascotas.routes.js";
import { usersRouter } from "./routes/usuarios.routes.js";
const server = express();

server.listen(8080, () => {
  console.log("Server is running");
});

server.use("/api/mascotas", petRouter);
server.use("/api/usuarios", usersRouter);
