const cron = require("node-cron");
const moment = require("moment");
const AzanServices = require("../services/azan.services");
const times = require("../data/prayerTimes");

// every Second to run azan if exists
cron.schedule("*/3 * * * * *", async () => {
  if (!times.prayerTimes.Fajr) {
    await AzanServices.fetchPrayerTimes();
  }
});

// every minute to run azan if exists
cron.schedule("* * * * *", async () => {
  await AzanServices.checkPrayerTime();
  console.log(
    "Check if there is a prayer time now every minute",
    moment().format("YYYY-MM-DD HH:mm:ss")
  );
});

// every hour to update today's prayer times
cron.schedule("0 0 */1 * * *", async () => {
  await AzanServices.fetchPrayerTimes();
  console.log(
    "running a task every hour",
    moment().format("YYYY-MM-DD HH:mm:ss")
  );
});
