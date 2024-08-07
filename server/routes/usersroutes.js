// import { getAllUsers,CreateUser} from "../controllers/Users.controller.js";
import { CreateUser, getAllUsers,getSingleUser,deleteUser } from "../controllers/Users.controller.js";
import { Router } from "express";

const router=Router();

router.get("/AllUsers",getAllUsers)
router.get("/SingleUser/:id",getSingleUser)
router.post("/CreateUser",CreateUser)
router.delete("/delete/:id",deleteUser)


export default router;
