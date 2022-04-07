const Zone = require("../models/zone");
const serialPort = require("../utils/serialCom");
const { getIo } = require("../utils/socket");
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
    // trigger socket message
    getIo().emit("name-change", { id, name });
  }

  // Turn zone On/Off
  static async controlZoneStatus(id, status) {
    // will send serial command
    serialPort.send(`${id}${status}#`);

    // trigger socket event message
    getIo().emit("status-change", { id, status });
  }

  // Turn all On/Off
  static async controlAll(value) {
    // will send serial command
    serialPort.send(`A${value}#`);
    // trigger socket event message
    getIo().emit("All", value);
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
    // trigger socket event message
    getIo().emit("statuses-change", data);
  }
}

module.exports = ZoneServices;
