import { getAllUsers } from "../controllers/Users.controller";
import { Router } from "express";

const usersrouter=Router();

usersrouter.get("AllUsers",getAllUsers)

export default usersrouter;
