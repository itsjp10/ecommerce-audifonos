import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/cart", async (req, res) => {
  const userId = req.user.id;
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
  });

  if (!cart) return res.json([]);

  res.json(cart.items);
});

router.post("/cart", async (req, res) => {
  const userId = req.user.id;
  const { id: productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "productId es requerido" });
  }

  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    //si no hay carro entonces creamos un cart nuevo
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return res
      .status(400)
      .json({ error: "Producto que se intenta colocar al carrito no existe" });
  }

  const existingItem = await prisma.cartItem.findUnique({
    //hacemos un findUnique para ver si el item que intentamos ingresar ya está en el carrito
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: product.id,
      },
    },
  });

  //si sí está en el carrito, entonces actualizamos su cantidad
  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    //si no está en el carrito lo creamos con la cantidad dada
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  //traemos el carrito actualizado
  const updatedCart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  res.json(updatedCart.items);
});

//ruta para actualizar la cantidad de un producto en un carrito
router.put("/cart:productId", (req, res) => {
  //TODO: queda pendiente actualizar cantidad de un producto en el carrito basado en un id dada.
  // Por ahora no se tiene esta función en el frontend
});

//eliminar un producto del carrito del cliente
router.delete("/cart/:productId", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product)
    //si el product id no existe no se puede eliminar
    return res.status(400).json({ error: "El producto a eliminar no existe" });

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  //error handler para saber si el usuario tiene carrito
  if (!cart)
    return res.status(400).json({ error: "Este usuario no tiene carrito" });

  //borramos todos los elementos con id del carrito
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });

  //ahora traemos el carrito actualizado de la base de datos
  const updatedCart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  res.json(updatedCart.items);

});

export default router;
