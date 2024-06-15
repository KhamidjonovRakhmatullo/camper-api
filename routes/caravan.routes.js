const {Router} = require("express");
const { addNewCaravan } = require("../controllers/caravan.controller");

const router = Router();

router.post("/post-caravan", addNewCaravan)

module.exports = router