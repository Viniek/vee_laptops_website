import express from "express";
import productsrouter from "./routes/products.routes.js";
import usersroutes from "./routes/usersroutes.js";
import cors from "cors"
import { config } from "dotenv";
import cookieParser from "cookie-parser";


config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/products",productsrouter)
app.use("/users",usersroutes)


app.listen(4000, () => {
  console.log("server running");
});

