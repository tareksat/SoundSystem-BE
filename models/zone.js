const { Model } = require('../utils/db');

class Zone extends Model {
    static get tableName() {
        return 'zones';
    }
}

module.exports = Zone;