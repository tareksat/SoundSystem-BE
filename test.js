// const moment = require("moment-timezone");

// // const now = new moment().add(10, "minutes").format("yyy-M-d HH:mm:ss");
// // console.log(now);
// const t = new moment();
// const t1 = new moment().add(10, "minutes");
// const hour = t.tz("Africa/Cairo").hour();
// const minute = t.tz("Africa/Cairo").minute();
// const hour1 = t1.hour();
// const minute1 = t1.minute();

// console.log(hour, minute);
// console.log(hour1, minute1);
const AzanServices = require("./services/azan.services");

async function run() {
  await AzanServices.playAzan("Dhuhr");
}

run();
