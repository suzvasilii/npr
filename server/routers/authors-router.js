const router = require('express').Router();
const authorController = require("../controllers/authors-controller");

router.get("/get-authors", authorController.getAuthors)

module.exports = router;