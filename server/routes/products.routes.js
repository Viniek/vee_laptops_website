import { Router } from "express";
import { createProduct,getAllProducts,DeleteProduct,getOneProduct,updateProduct } from "../controllers/Productscontroller.js";


const productsrouter=Router();
productsrouter.post("/AddProduct",createProduct)
productsrouter.get("/AllProducts",getAllProducts)
productsrouter.delete("/DeleteProduct/:id",DeleteProduct)
productsrouter.get("/getOneProduct/:id",getOneProduct)
productsrouter.patch("/updateProduct/:id",updateProduct)

 
export default productsrouter;