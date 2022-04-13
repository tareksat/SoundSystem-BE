const router = require("express")();
const PrayersController = require("../controllers/prayers.controller");

router.get("/", PrayersController.getPrayerTimes);

router.post("/azan", PrayersController.playAzan);

router.post("/preazan", PrayersController.playPreAzan);

module.exports = router;
