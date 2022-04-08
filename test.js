const AzanServices  = require('./services/azan.services');
const ZoneServices = require('./services/zone.services')

// AzanServices.playAzan('Fajr');
async function test(){
    const z = await ZoneServices.getAllZones()
    console.log(z)
}

test()