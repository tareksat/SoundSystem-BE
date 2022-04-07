const router = require('express')();
const SettingsController = require('../controllers/settings.controller');

router.get('/:id', SettingsController.getSettings);
router.post('/', SettingsController.setSettings);
router.post('/enableDisablePrayerTime', SettingsController.enableDisablePrayerTimeSound);
module.exports = router;