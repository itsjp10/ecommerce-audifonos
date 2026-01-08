import { Router } from "express";
import { prisma } from "../lib/prisma.js";


const router = Router();

router.get("/product", (req, res) => {
  res.send("Get en products");
});

router.post("/product", async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    //TODO: handle imgUrl
    const imageUrl = "not for now";

    if (!name || price == null || stock == null) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    // 1️⃣ Crear inventario
    const inventory = await prisma.inventory.create({
      data: {
        stock,
        reserved: 0,
      },
    });

    // 2️⃣ Crear producto
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        inventoryId: inventory.id,
      },
      include: {
        inventory: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

export default router;
