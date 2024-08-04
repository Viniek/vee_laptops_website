import express from "express";
import cors from "cors";
import { config } from "dotenv";
import productsrouter from "./routes/Productsroutes";

config();
const app = express();
app.use(
  express.json({
    reviver: (key, value) =>
      typeof value === "bigint" ? value.toString() : value,
    replacer: (key, value) =>
      typeof value === "bigint" ? value.toString() : value,
  }),
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use("/products",productsrouter)


app.listen(3000, () => {
  console.log("server running");
});