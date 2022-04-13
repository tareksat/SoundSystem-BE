const Zone = require("../models/zone");
const serialPort = require("../utils/serialCom");

class ZoneServices {
  // get all zones
  static async getAllZones() {
    const zones = await Zone.query();
    return zones;
  }

  static async getAllZoneStatus() {
    const state = await Zone.query().select("zones.status");
    return {
      z1_status: state[0].status,
      z2_status: state[1].status,
      z3_status: state[2].status,
      z4_status: state[3].status,
      z5_status: state[4].status,
      z6_status: state[5].status,
      z7_status: state[6].status,
    };
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

    await Zone.query().findById(id).patch({ status });
    const zones = await ZoneServices.getAllZoneStatus();
    const keys = Object.keys(zones);
    let counter = 0;
    keys.map(async (key) => {
      if (zones[key] !== 0) counter += 1;
    });
    if (counter === 0) await ZoneServices.controlAll(0);
    else serialPort.send(`${id}${status}#`);
  }

  // Turn all On/Off
  static async controlAll(value) {
    // will send serial command
    serialPort.send(`A${value}#`);
    await Zone.query().findById(1).patch({ status: value });
    await Zone.query().findById(2).patch({ status: value });
    await Zone.query().findById(3).patch({ status: value });
    await Zone.query().findById(4).patch({ status: value });
    await Zone.query().findById(5).patch({ status: value });
    await Zone.query().findById(6).patch({ status: value });
    await Zone.query().findById(7).patch({ status: value });
  }

  // set zones to certain values
  static async setZones(values) {
    // send serial command containing values for each zone
    serialPort.send(`11#`);
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
