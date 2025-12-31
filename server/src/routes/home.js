import { Router } from "express";

const router = Router();

router.all("/about", (req, res) => {
  const title = "Mi pagina creadad desde Express 2";
  res.send("This is title");
});
router.get("/dashboard", (req, res) => {});

export default router;
