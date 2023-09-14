import express from "express";

const server = express();
const PORT = 8080;
let productList = [];

server.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
server.get("/api/products", (req, res) => {
  res.json({ data: productList });
});
server.get("/api/products/:id", (req, res) => {
  const ID = +req.params.id;
  const product = productList.find((ele) => ele.id === ID);
  res.json({ data: product });
});

server.post("/api/products", (req, res) => {
  let { title, description, code, price, status, stock, category, thumbnails } =
    req.body;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !status ||
    !stock ||
    !category
  ) {
    res.send("Se deben llenar todos los campos");
  }
  let images = [];
  if (thumbnails) {
    images.push(...thumbnails);
  }
  let newProduct = {
    id: productList.length > 0 ? productList[productList.length - 1].id + 1 : 1,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails: images,
  };

  productList.push(newProduct);
  res.json({ message: "Product added" });
});

server.put("/api/products/:pId", (req, res) => {
  const pId = parseInt(req.params.pId);
  const newProduct = req.body;
  const product = productList.findIndex((ele) => ele.id === pId);

  if (product === -1) {
    return res.status(404).json({ message: "Product isn't exist" });
  }
  productList[product] = {
    id: pId,
    ...newProduct,
  };
  res.json({ message: "Product updated", product: productList[product] });
});

server.delete("/api/products/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);

  const productIndex = productList.findIndex((ele) => ele.id === productId);
  // Si no queremos mutar el Array principal podriamos usar Filter pero la variable seria Let no const
  if (productIndex !== -1) {
    productList.splice(productIndex, 1); // Eliminar el producto de la lista.
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
