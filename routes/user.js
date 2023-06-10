const { Router } = require("express");
const router = Router();

// Middlewares
const auth = require("../middleware/auth")

// Controllers
const controller = require("../controllers/user");

// Routes

router.post("/login", controller.login);
router.post("/logout", auth ,controller.Logout);



module.exports = router;
