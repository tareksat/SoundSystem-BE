require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const zoneRouter = require('./routes/zones.route');
const settingsRouter = require('./routes/settings.route');
const prayerTimesRouter = require('./routes/prayer.router');
require('./utils/serialCom').init();

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/zones', zoneRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/prayertimes', prayerTimesRouter);

const port = process.env.PORT;

const server = app.listen(port, async ()=>{
    console.log(`Server is running on port ${port}`);
    // initialize prayer time with start up
    await require('./services/azan.services').fetchPrayerTimes();
    require('./cronJobs/cron')

});

const io = require('./utils/socket').init(server);
io.on("connection", socket => {
    console.log('Connected')
});
