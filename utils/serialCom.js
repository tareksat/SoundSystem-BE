const SerialPort = require("serialport");

module.exports = {
    port: null,
    commPort: process.env.COM_PORT,
    baudRate: parseInt(process.env.BAUDE_RATE),
    init: function () {

        const port = new SerialPort(this.commPort, {
            baudRate: this.baudRate,
            autoOpen: true
        });

        this.port = port;

        port.on('open', function () {
        });

        port.on('error', function (err) {
            console.log('Error: ', err.message)
        });

        port.on("data", (data) => {
            console.log(data.toString())
        });
    },
    send: function (data) {
        if (this.port) {
            this.port.write(data, function (err) {
                if (err) {
                    return console.log('Error on write: ', err.message)
                }
                console.log('data written', data)
            });
        }
    }
}