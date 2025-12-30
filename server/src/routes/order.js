const { Router } = require("express");

const router = Router();

router.get("/orders", (req, res) => {
  res.send("Obteniendo todas las ordenes");
});

router.get("/order/:id", (req, res) => {
  res.send(`Obteniendo order con id ${req.params.id}`);
});

router.post("/order", (req, res) => {
  res.send("Creando orden en la base de datos");
});

router.put("/order/:id/tracking", (req, res) => {
  console.log(req.body)  
  res.send(`Actualizando el tracking ${req.body.tracking} de la orden ${req.params.id}`);
});

module.exports = router;
