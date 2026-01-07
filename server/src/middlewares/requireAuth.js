import jwt from "jsonwebtoken";
import { env } from "process";
import { prisma } from "../lib/prisma.js";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(403).send("Access not authorized"); //Si no hay token de acceso, se niega el acceso
  }

  try {
    const data = jwt.verify(token, env.JWT_SECRET); //Verificacion del JWT

    const user = await prisma.user.findUnique({
      //consulta a la base de datos para ver si existe el usuario con id del jwt payload
      where: { id: data.id },
    });

    if (!user) {
      res.status(401).send("Access not authorized");
    }

    req.user = data; //cargamos el req con el payload de jwt, no con el user de base de datos porque tiene la contraseña cifrada

    next();
  } catch (error) {
    return res.status(401).send("Access not authorized");
  }
};
