// routes/auth.js
import { Router } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";

const router = Router();

router.get("/me", (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const user = jwt.verify(token, env.JWT_SECRET);
    res.json({
      authenticated: true,
      user,
    });
  } catch (error) {
    return res.status(401).send("Access not authorized");
  }
});

export default router;
