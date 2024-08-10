import { Router } from "express";
import { getCartProducts,getSingleCartProduct } from "../controllers/Cart.controller.js";

const cartRouter=Router();

cartRouter.get("/cartProducts",getCartProducts)
cartRouter.get("/SingleCartProduct/:id",getSingleCartProduct)

export  default cartRouter;