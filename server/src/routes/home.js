import jwt from "jsonwebtoken";
import { env } from "process";
import { Router } from "express";

const router = Router();

router.all("/protected", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send("Access not authorized");
  }
  try {
    const data = jwt.verify(token, env.JWT_SECRET);
    res.send(data)
  } catch (error) {
    return res.status(401).send("Access not authorized");
  }
});
router.get("/dashboard", (req, res) => {});

export default router;
