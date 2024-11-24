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
