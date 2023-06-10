const { Router } = require("express");
const router = Router();

// Routers
const userRouter = require("./user");
const dataRouter = require("./data");

router.use("/users", userRouter);
router.use("/data", dataRouter);

module.exports = router;
