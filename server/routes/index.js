const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter")
const brandRouter = require("./brandRouter")
const deviceRouter = require("./deviceRouter")
const typeRouter = require("./typeRouter")

router.use("/user", userRouter)
router.use("/brand", brandRouter)
router.use("/device", deviceRouter)
router.use("/type", typeRouter)

module.exports = router;