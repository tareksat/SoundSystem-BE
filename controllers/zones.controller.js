const ZoneServices = require("../services/zone.services");

class ZonesController {
  // get all zones
  static async getAllZones(req, res) {
    const zones = await ZoneServices.getAllZones();
    res.send(zones);
  }

  // Enable/disable Zone
  static async enableDisableZone(req, res) {
    const { id, status } = req.body;
    await ZoneServices.enableDisableZone(id, status);
    res.send({ status: 200 });
  }

  // Rename Zone
  static async setZoneName(req, res) {
    const { id, name } = req.body;
    await ZoneServices.setZoneName(id, name);
    res.send({ status: 200 });
  }

  // Turn zone On/Off
  static async controlZoneStatus(req, res) {
    const { id, status } = req.body;
    await ZoneServices.controlZoneStatus(id, status);
    res.send({ status: 200 });
  }

  // Turn all On/Off
  static async controlAll(req, res) {
    const { value } = req.body;
    await ZoneServices.controlAll(value);
    res.send({ status: 200 });
  }
}

module.exports = ZonesController;
