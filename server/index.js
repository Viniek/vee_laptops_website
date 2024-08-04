import express from "express";
import productsrouter from "./routes/products.routes.js";

const app = express();
app.use(express.json());
app.use("/products",productsrouter)


app.listen(4000, () => {
  console.log("server running");
});