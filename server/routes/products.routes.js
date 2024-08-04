import { Router } from "express";
import { createProduct } from "../controllers/Productscontroller.js";
const productsrouter=Router();
productsrouter.post("/AddProduct",createProduct)


export default productsrouter;