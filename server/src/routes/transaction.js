import { Router } from "express";

const router = Router();

router.post("/tokens/card", async (req, res) => {
  try {
    const { number, cvc, exp_month, exp_year, card_holder } = req.body;

    const tokenizada = await fetch("https://sandbox.wompi.co/v1/tokens/cards", {
      method: "POST",
      body: JSON.stringify({ number, cvc, exp_month, exp_year, card_holder }),
      headers: {
        Authorization: `Bearer ${process.env.WOMPI_PUB}`,
        "Content-Type": "application/json",
      },
    });
    const data = await tokenizada.json()
    res.json(data);
     
  } catch (error) {
    res.status(500).json({error: "Error tokenizando tarjeta"})
  }
});

export default router;
