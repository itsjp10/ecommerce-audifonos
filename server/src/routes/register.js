import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    console.log("Usuario creado", newUser);
    res.send("Usuario creado con éxito");
  } catch (error) {
    console.error("Error al crear usuario", error);
    res.status(500).send("Error al crear usuario");
  }
});

module.exports = router;
