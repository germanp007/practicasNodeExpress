import { Router } from "express";
import express from "express";
import fs from "fs";
import { __dirname } from "../utils.js";
import path from "path";
const router = Router();
const usuarios = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/db/usuarios.json"), "utf-8")
);

console.log(typeof usuarios);
router.use(express.json());

router.get("/", (req, res) => {
  res.json({data: usuarios});
});

export { router as usersRouter };
