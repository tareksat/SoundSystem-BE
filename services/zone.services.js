const Zone = require("../models/zone");
const serialPort = require("../utils/serialCom");
const zoneStatus = require("../data/zoneStatus");

class ZoneServices {
  // get all zones
  static async getAllZones() {
    const zones = await Zone.query();
    return zones;
  }

  // Enable/disable Zone
  static async enableDisableZone(id, status) {
    await Zone.query().findById(id).patch({
      is_enabled: status,
    });
    // trigger socket message
  }

  // Rename Zone
  static async setZoneName(id, name) {
    await Zone.query().findById(id).patch({
      name,
    });

  }

  // Turn zone On/Off
  static async controlZoneStatus(id, status) {
    // will send serial command

    serialPort.send(`${id}${status}#`);

  }

  // Turn all On/Off
  static async controlAll(value) {
    // will send serial command
    serialPort.send(`A${value}#`);
  }

  // set zones to certain values
  static async setZones(values) {
    // send serial command containing values for each zone
    const data = [];
    let command = "X";
    Object.keys(values).map((value, index) => {
      data.push({ id: index + 1, value: values[value] });
      command = command + values[value];
    });
    command = command + "#";
    serialPort.send(command);
  }
}

module.exports = ZoneServices;
