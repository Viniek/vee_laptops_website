import { Router } from "express";
import { getCartProducts,getSingleCartProduct,createCartProduct } from "../controllers/Cart.controller.js";

const cartRouter=Router();

cartRouter.get("/cartProducts",getCartProducts)
cartRouter.get("/SingleCartProduct/:id",getSingleCartProduct)
cartRouter.post("/createCartProduct",createCartProduct)

export  default cartRouter;