import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/register", async (req, res) => {
  //Obtener los datos del req
  const { email, password } = req.body;

  //Validaciones
  if (!email || !password) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  //hash de la contraseña
  const hashedPassword = bcrypt.hashSync(password, 10)
  
  //Insertar en la base de datos
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, //Se guarda la contraseña hasheada
      },
    });
    console.log("Usuario creado", newUser);
    res.send("Usuario creado con éxito");
  } catch (error) {
    console.error("Error al crear usuario", error);
    res.status(500).send("Error al crear usuario");
  }
});

export default router;
