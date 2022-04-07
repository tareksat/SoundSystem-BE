const Setting = require('../models/setting');

class SettingsServices {

    // get current settings
    static async getSettings(id) {
        return Setting.query().findById(id);
    }

    // update azan setting
    static async setSettings(id, payload) {
        await Setting.query().findById(id).patch(payload);
    }

    // get settings for a selected prayer time by name
    static async getPrayerTimeSettings(name) {
        return Setting.query()
            .findOne({prayer_time: name})
            .select('settings.z1_status',
                'settings.z2_status', 'settings.z3_status', 'settings.z4_status',
                'settings.z5_status', 'settings.z6_status', 'settings.z7_status', 'is_enabled')
    }

    static async enableDisablePrayerTimeSound(id, value) {
        await Setting.query().findById(id).patch({is_enabled: value});
    }
}

module.exports = SettingsServices;