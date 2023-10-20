import { Router } from "express";
import express from "express";
import fs from "fs";
import { __dirname } from "../utils.js";
import path from "path";
const router = Router();
const usuarios = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/db/usuarios.json"), "utf-8")
);


router.use(express.json());

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if(!isNaN(limit)){
    const limitedUser = usuarios.slice(0, limit);
    res.json({data: limitedUser})
  }else{
  res.json({data: usuarios});
    
  }
});
router.get("/:id", (req,res)=>{
  const userId = parseInt(req.params.id);
  const user = usuarios.find(ele => ele.id === userId);
  res.json({data: user});
})

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
  fs.writeFileSync(path.join(__dirname, "/db/usuarios.json"), usuarios)
})

router.put("/:id", (req,res)=> {
  const uId = parseInt(req.params.id);
  const indexUser = usuarios.findIndex(ele => ele.id === uId);
  if(indexUser !== -1){
    const updatedUser = {
      ...usuarios[indexUser],
      ...req.body
    };
    usuarios[indexUser] = updatedUser;
    fs.writeFileSync(path.join(__dirname, "/db/usuarios.json"), usuarios)
  } else {
    res.json({message: "Usuario no encontrado"})
  }
});

router.delete("/:id", (req,res)=>{
  const userId = parseInt(req.params.id);
  const index = usuarios.findIndex(ele => ele.id === userId)
  if(index !== -1){
     usuarios.splice(index, 1);
    res.json({message: "Usuario borrado con exito"})
  }else{
    res.json({message: "El usuario no se encontro"})
  }
})

export { router as usersRouter };
