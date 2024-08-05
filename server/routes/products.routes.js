import { Router } from "express";
import { createProduct,getAllProducts,DeleteProduct } from "../controllers/Productscontroller.js";


const productsrouter=Router();
productsrouter.post("/AddProduct",createProduct)
productsrouter.get("/AllProducts",getAllProducts)
productsrouter.delete("/DeleteProduct/:id",DeleteProduct)


export default productsrouter;