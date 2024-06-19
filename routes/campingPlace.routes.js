const {Router} = require("express");
const { addNewCampingPlace } = require("../controllers/campingPlace.controller");

const router = Router();

router.post("/post-campingPlace", addNewCampingPlace)

module.exports = router