const AzanSettingsServices = require('../services/settings.services');

class SettingsController {
    // get current settings
    static async getSettings(req, res){
        const id = req.params.id;
        const settings = await AzanSettingsServices.getSettings(id);
        res.send(settings);
    }

    // update azan setting
    static async setSettings(req, res){
        const {id, payload} = req.body;
        await AzanSettingsServices.setSettings(id, payload);
        res.send({status: 200});
    }

    static async enableDisablePrayerTimeSound(req, res){
        const {id, value} = req.body;
        await AzanSettingsServices.enableDisablePrayerTimeSound(id, value);
        res.send({status: 200})
    }
}

module.exports = SettingsController;