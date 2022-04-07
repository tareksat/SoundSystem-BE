const router = require('express')();
const PrayersController = require('../controllers/prayers.controller');

router.get('/', PrayersController.getPrayerTimes);

router.post('/', PrayersController.playAzan);

module.exports = router;