import express from "express";
import morgan from "morgan";

const app = express();
import HomeRoutes from "./src/routes/home.js";
import ProductRoutes from "./src/routes/product.js";
import OrderRoutes from "./src/routes/order.js";
import LoginRoutes from "./src/routes/login.js";
import RegisterRoutes from "./src/routes/register.js";
//settings
app.set("appName", "Aurea Tech");
app.set("port", 3000);

//middlewares
app.use(express.json())
app.use(morgan("dev"));

app.use(HomeRoutes);
app.use(ProductRoutes);
app.use(OrderRoutes);
app.use(LoginRoutes);
app.use(RegisterRoutes);

//server running
app.listen(app.get("port"));
console.log(`Server ${app.get("appName")} on port ${app.get("port")}`);
