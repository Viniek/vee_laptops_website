import { Router } from "express";
import { getAllProducts,getSingleProduct,createProduct,deleteProduct } from "../controllers/Productscontroller,js";

const productsrouter=Router();

productsrouter.get("/AllProducts",getAllProducts)
productsrouter.get("/SingleProduct/:id",getSingleProduct)
productsrouter.create("/AddProduct",createProduct)
productsrouter.delete("/delete/:id",deleteProduct)

export default productsrouter;