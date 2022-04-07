const { Model } = require('../utils/db');

class Setting extends Model {
    static get tableName() {
        return 'settings';
    }
}

module.exports = Setting;