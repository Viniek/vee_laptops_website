import { Router } from "express";
import { cartVerifyToken } from "../Middlewares/cartVerifyToken.js";
import { getCartProducts,getSingleCartProduct,AddToCart,deleteCartProduct } from "../controllers/Cart.controller.js";

const cartRouter=Router();

cartRouter.get("/cartProducts",cartVerifyToken,getCartProducts)
cartRouter.get("/SingleCartProduct/:id",cartVerifyToken,getSingleCartProduct)
cartRouter.post("/AddToCart",cartVerifyToken,AddToCart)
cartRouter.delete("/deleteCartProduct/:id",cartVerifyToken,deleteCartProduct)

export  default cartRouter;