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

router.post("/", (req,res)=> {
  const {name, lastName, adress, email} = req.body;

  if(!name || !lastName || !adress || !email){
    res.json({message: "Se deben llenar todos los campos"})
  } 
  const newId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  const newUser = {
    id: newId,
    name,
    lastName,
    adress,
    email
  }
  usuarios.push(newUser);
  fs.writeFileSync(path.join(__dirname, "/db/usuarios.json"))
})

router.put("/:id", (req,res)=> {
  const uId = req.params.id;
  const indexUser = usuarios.findIndex(ele => ele.id === uId);
})

export { router as usersRouter };
