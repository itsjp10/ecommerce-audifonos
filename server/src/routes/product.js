const { Router } = require("express");

const router = Router();

router.get("/product", (req, res) => {
  res.send("Get en products");
});

router.post("/product", (req, res) => {
  res.send("Post en products");
});

module.exports = router;
