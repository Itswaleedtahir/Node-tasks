const { Router } = require("express");
const router = Router();

// Middlewares


// Controllers
const data = require("../controllers/task2");
const add = require("../controllers/taskk3")

// Routes


router.post("/import", data.importstock)
router.get("/export", data.exportstock)
router.get("/people", add.peopleWithAddress)
router.get("/without", add.peopleWithoutAddress)
router.get("/duplicate", add.peopleWithDuplicateAddress)

module.exports = router;
