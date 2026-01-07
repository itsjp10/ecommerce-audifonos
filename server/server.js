import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
import HomeRoutes from "./src/routes/home.js";
import ProductRoutes from "./src/routes/product.js";
import OrderRoutes from "./src/routes/order.js";
import LoginRoutes from "./src/routes/login.js";
import RegisterRoutes from "./src/routes/register.js";
import authRoutes from "./src/routes/auth.js";

import { requireAuth } from "./src/middlewares/requireAuth.js";

//settings
app.set("appName", "Aurea Tech");
app.set("port", 3000);

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); //Habilitar CORS para todas las rutas
app.use(RegisterRoutes);
app.use(LoginRoutes);

app.use(requireAuth); //se protegen las rutas con este middleware de autenticación (aplica para las rutas de abajo)
app.use(HomeRoutes);
app.use(ProductRoutes);
app.use(OrderRoutes);
app.use(authRoutes);

//server running
app.listen(app.get("port"));
console.log(`Server ${app.get("appName")} on port ${app.get("port")}`);
