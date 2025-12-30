const express = require("express");
const morgan = require("morgan");

const app = express();
const HomeRoutes = require("./src/routes/home");
const ProductRoutes = require("./src/routes/product");
const OrderRoutes = require("./src/routes/order");
const LoginRoutes = require("./src/routes/login");
const RegisterRoutes = require("./src/routes/register");

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
