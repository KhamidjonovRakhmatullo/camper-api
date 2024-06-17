const {Router} = require("express");
const { addNewTuning } = require("../controllers/tuning.controller");

const router = Router();

router.post("/post-tuning", addNewTuning)

module.exports = router;