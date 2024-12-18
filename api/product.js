const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const includeProduct = req.user ? { where: { ownerId: req.user.id } } : false;
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: +id },
    });
    res.json(product);
  } catch (e) {
    next(e);
  }
});
