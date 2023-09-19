import { Router } from "express";
import { __dirname, uploader } from "../utils.js";
import fs from "fs";
import path from "path";
const router = Router();
const mascotas = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/db/mascotas.json"), "utf-8")
);

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  const limit = +req.query.limit;
  if (!isNaN(limit)) {
    let result;
    if (limit > mascotas.length) {
      res.status("406").json({ message: "Limite excedido" });
    } else {
      result = mascotas.slice(0, limit);
      res.json({ data: result });
    }
  } else {
    res.json({ data: mascotas });
  }
});

router.get("/:pid", (req, res) => {
  let petId = Number(req.params.pid);
  let pet = mascotas.find((ele) => ele.id === petId);
  if (pet) {
    res.send(data: pet);
  } else {
    res.status(404).json({ message: "La mascota con ese Id no existe" });
  }
});

router.post("/", uploader.single("file"), (req, res) => {
  const { name, age, type } = req.body;
  const file = req.file;
  console.log(file);
  if (!name || !age || !type || !file) {
    return res
      .status(404)
      .json({ message: "Se deben llenar todos los campos y subir una imagen" });
  }

  let newId = mascotas.length > 0 ? mascotas[mascotas.length - 1].id + 1 : 1;

  let newPet = {
    id: newId,
    name,
    age,
    type,
    image: file.filename,
  };

  mascotas.push(newPet);
  fs.writeFileSync(
    path.join(__dirname, "/db/mascotas.json"),
    JSON.stringify(mascotas, null, 2)
  );

  res.json({ message: "Mascota agregada correctamente" });
});

router.put("/:pid", (req, res) => {
  const pid = +req.params.pid;
  const body = req.body;
  const mascota = mascotas.findIndex((ele) => ele.id === pid);
  if (mascota !== -1) {
    mascotas[mascota] = {
      id: pid,
      ...mascotas[mascota],
      ...body,
    };
  } else {
    res.status(503).json({ message: "No se encontró la mascota" });
  }
  fs.writeFileSync(
    path.join(__dirname, "/db/mascotas.json"),
    JSON.stringify(mascotas, null, 2)
  );
  res.json({ message: "Mascota modificada correctamente" });
});

router.delete("/:pid", (req, res) => {
  const pid = +req.params.pid;
  const mascota = mascotas.findIndex((ele) => ele.id === pid);

  if (mascota !== -1) {
    const imagePath = mascotas[mascota].image;

    mascotas.splice(mascota, 1);
    fs.unlinkSync(path.join(__dirname, `/public/images/${imagePath}`));
    fs.writeFileSync(
      path.join(__dirname, "/db/mascotas.json"),
      JSON.stringify(mascotas, null, 2)
    );

    res.json({ message: "La mascota fue borrada" });
  } else {
    res.json({ message: "La mascota con ese ID no se encontro" });
  }
});

export { router as petRouter };
