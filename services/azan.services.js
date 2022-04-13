const axios = require("axios");
const times = require("../data/prayerTimes");
const moment = require("moment-timezone");
const player = require("play-sound")((opts = {}));
const Settings = require("../services/settings.services");
const ZoneServices = require("../services/zone.services");

class AzanServices {
  // Fetch prayer times for today from the internet
  static async fetchPrayerTimes() {
    try {
      const { data } = await axios.get(
        "http://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5"
      );
      const prayerTimes = data.data.timings;
      const day = data.data.date.hijri.day;
      const month_ar = data.data.date.hijri.month.ar;
      const month_en = data.data.date.hijri.month.en;
      const year = data.data.date.hijri.year;
      const date = data.data.date.hijri.date;
      times.date = {
        day,
        month_ar,
        month_en,
        year,
        date,
      };
      times.prayerTimes = prayerTimes;
    } catch (e) {}
  }

  // check if azan exists
  static async checkPrayerTime() {
    // 15 minutes before prayer time
    const t1 = new moment().add(15, "minutes");
    const hour = moment().tz("Africa/Cairo").hour();
    const minute = moment().tz("Africa/Cairo").minute();
    const hour_1 = t1.hour();
    const minute_1 = t1.minute();

    const keys = Object.keys(times.prayerTimes);
    keys.map(async (key) => {
      const time = stringToDateTime(times.prayerTimes[key]);
      if (time.hour === hour && time.minute === minute) {
        await AzanServices.playAzan(key, true);
      } else if (time.hour === hour_1 && time.minute === minute_1) {
        await AzanServices.playAzan(key);
      }
    });
  }

  // play azan
  static async playAzan(name, type = false) {
    console.log(`Prayer Time Now ${name}`);
    const currentStatus = await ZoneServices.getAllZoneStatus();

    // get enabled zones for this prayer time
    const settings = await Settings.getPrayerTimeSettings(name);

    if (settings.is_enabled === 0) return;
    // send command to activate zones
    delete settings.is_enabled;
    await ZoneServices.setZones(settings);
    // play azan accordingly
    if (type) {
      if (name === "Fajr") {
        try {
          await play("fajr");
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          await play("rest");
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      try {
        await play("close");
      } catch (e) {
        console.log(e);
      }
    }

    await ZoneServices.setZones(currentStatus);
  }
}

function stringToDateTime(str) {
  const hour = parseInt(str.split(":")[0]);
  const minute = parseInt(str.split(":")[1]);
  return { hour, minute };
}

function play(file) {
  return new Promise((resolve, reject) => {
    player.play(`./sound/${file}.wav`, function (err, _) {
      if (err) reject(err);
      resolve("done");
    });
  });
}

module.exports = AzanServices;
