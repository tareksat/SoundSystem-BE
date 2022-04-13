const times = require("../data/prayerTimes");
const AzanServices = require("../services/azan.services");

class PrayersController {
  static getPrayerTimes(req, res) {
    res.send(times);
  }

  static async playAzan(req, res) {
    res.send({ status: 200 });
    await AzanServices.playAzan(req.body.name, true);
  }
  static async playPreAzan(req, res) {
    res.send({ status: 200 });
    await AzanServices.playAzan(req.body.name);
  }
}

module.exports = PrayersController;
