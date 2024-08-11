// import { getAllUsers,CreateUser} from "../controllers/Users.controller.js";
import { updateProduct } from "../controllers/Productscontroller.js";
import { CreateUser, getAllUsers,getSingleUser,deleteUser,UpdateUser,loginUser} from "../controllers/Users.controller.js";
import { Router } from "express";

const router=Router();

router.get("/AllUsers",getAllUsers)
router.get("/SingleUser/:id",getSingleUser)
router.post("/CreateUser",CreateUser)
router.delete("/delete/:id",deleteUser)
router.patch("/UpdateUser/:id",UpdateUser)
router.post("/Login",loginUser)
export default router;
 