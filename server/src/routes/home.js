import { Router } from "express";

const router = Router();

router.all("/protected", (req, res) => {
  res.json({
    message: "home protegida",
    user: req.user
  })
});
router.get("/dashboard", (req, res) => {});

export default router;
