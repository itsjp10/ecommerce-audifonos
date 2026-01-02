import { Router } from "express";
import jwt from "jsonwebtoken"
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { env } from "process";

const router = Router();
const SECRET_KEY = env.JWT_SECRET

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

  //creamos el jwt y es lo que vamos a enviar cuando el usuario esté logueado
  const token = jwt.sign({id: userSafe.id, email: userSafe.email}, SECRET_KEY, {
    expiresIn: "1h"
  })

  res.status(200).json({
    message: "login exitoso",
    user: userSafe,
    token
  })
}); //acceder
router.post("/logout", (req, res) => {});
router.get("/protected", (req, res) => {});

export default router;
