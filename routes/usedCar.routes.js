const {Router} = require("express");
const { addNewUsedCar } = require("../controllers/usedCar.controller");

const router = Router();

router.post("/post-usedcar", addNewUsedCar)

module.exports = (router)