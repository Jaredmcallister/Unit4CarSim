const express = require("express");
const router = express.Router();
module.exports = router;

const { authenticate } = require("./auth");
const prisma = require("../prisma");
router.get("/", authenticate, async (req, res, next) => {
  const { id } = req.user;
  try {
    const orders = await prisma.order.findMany({
      where: { ownerId: +id },
    });
    res.json(orders);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { date, note, orderIds } = req.body;
  try {
    const products = productIds.map((id) => ({ id }));
    const order = await prisma.order.create({
      data: {
        date,
        note,
        ownerId: req.user.id,
        items: { connect: products },
        // model Order {
        //   // id Int @id @default(autoincrement())
        //   // date String
        //   // note String
        //   // customer User @relation(fields: [ownerId], references: [id])
        //   // ownerId Int
        //   // items Product []
      },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: +id },
      include: { products: true },
    });
    if (order.ownerId !== req.user.id) {
      next({ status: 403, message: "This isn't your Order" });
    }
    res.json(order);
  } catch (e) {
    next(e);
  }
});
//need to put in the get route for the orders
