const Router = require("express");
const userController = require("../controllers/userController");
const router = new Router();
const authMiddlewara = require("../middleware/authMiddleware")

router.post("/");
router.use("/registration", userController.registration);
router.use("/login", userController.login);
router.use("/auth", authMiddlewara, userController.check);

module.exports = router;