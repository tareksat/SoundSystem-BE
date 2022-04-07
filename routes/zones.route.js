const router = require('express')();
const ZonesController = require('../controllers/zones.controller');

router.get('/', ZonesController.getAllZones);
router.post('/enableDisableZone', ZonesController.enableDisableZone);
router.post('/setZoneName', ZonesController.setZoneName);
router.post('/controlZoneStatus', ZonesController.controlZoneStatus);
router.post('/controlAll', ZonesController.controlAll);

module.exports = router;