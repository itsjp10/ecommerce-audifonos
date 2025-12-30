const express = require("express");
const morgan = require("morgan");

const app = express();
const HomeRoutes = require("./src/routes/home");
const ProductRoutes = require("./src/routes/product");

//settings
app.set("appName", "Aurea Tech");
app.set("port", 3000);

//middlewares
app.use(morgan("dev"));

app.use(HomeRoutes);
app.use(ProductRoutes);

//server running
app.listen(app.get("port"));
console.log(`Server ${app.get("appName")} on port ${app.get("port")}`);
