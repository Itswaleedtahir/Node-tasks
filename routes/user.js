const { Router } = require("express");
const router = Router();

// Middlewares
const auth = require("../middleware/auth")

// Controllers
const controller = require("../controllers/task1");

// Routes

router.post("/login", controller.login);
router.post("/logout", auth ,controller.Logout);



module.exports = router;
