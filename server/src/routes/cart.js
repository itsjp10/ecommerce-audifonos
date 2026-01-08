import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/cart", async (req, res) => {
  const userId = req.user.id;
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
  });

  if (!cart) return res.json([]);

  res.json(cart.items)
});

router.post("/cart", (req, res) => {});

router.put("/cart:productId", (req, res) => {});

router.delete("/cart:productId", (req, res) => {});

export default router;
