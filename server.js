import express from "express";

const server = express();
const PORT = 8080;
const productList = [];

server.use(express.json());

server.get("/api/products", (req, res) => {
  res.json({ data: productList });
});
server.get("/api/products/:id", (req, res) => {
  const ID = +req.params.id;
  const product = productList.find((ele) => ele.id === ID);
  res.json({ data: product });
});

server.post("/api/products", (req, res) => {
  let newProduct = {
    id: productList.length > 0 ? productList[productList.length - 1].id + 1 : 1,
    ...req.body,
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
