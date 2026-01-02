import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/login", async (req, res) => {
  //Obtener los datos del req
  const { email, password } = req.body;

  //Validaciones
  if (!email || !password) {
    return res.status(400).send("Faltan datos obligatorios");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return res.status(404).send("Invalid credentials");

  //comparar el password que nos pasan con el que tenemos hasheado
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send("Invalid credentials");

  const { password: _password, ...userSafe} = user;

  res.status(200).json({
    message: "login exitoso",
    user: userSafe
  })
}); //acceder
router.post("/logout", (req, res) => {});
router.get("/protected", (req, res) => {});

export default router;
