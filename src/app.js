import express from "express";
import path from "path";
import { __dirname } from "./utils.js";
import { petRouter } from "./routes/mascotas.routes.js";
import { usersRouter } from "./routes/usuarios.routes.js";
const app = express();

app.listen(8080, () => {
  console.log("Server is running");
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/mascotas", petRouter);
app.use("/api/usuarios", usersRouter);
