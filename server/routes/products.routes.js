import { Router } from "express";
import { createProduct,getAllProducts } from "../controllers/Productscontroller.js";


const productsrouter=Router();
productsrouter.post("/AddProduct",createProduct)
productsrouter.get("/AllProducts",getAllProducts)


export default productsrouter;