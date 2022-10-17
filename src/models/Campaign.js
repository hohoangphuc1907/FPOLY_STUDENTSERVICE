const mongoose = require('mongoose');
const { Schema } = require('mongoose');

class Campaign {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'name': {
                'type': String,
                'required': false,
                'default': ''
            },
            'type': {
                'type': Number,
                'required': false,
            },
            'department': {
                'type': Number,
                'required': false,
            },
            'time': {
                'type': Date,
                'required': true,
            },
            'createdBy': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'user'
            }
        }, { 'timestamps': true });

        // schema.plugin( uniqueValidator );
        try {
            mongoose.model('campaign', schema);
        } catch (e) {

        }

    }

    getInstance() {
        if (!Campaign.instance) {
            this.initSchema();
            Campaign.instance = mongoose.model('campaign');
        }
        return Campaign.instance;
    }
}

module.exports = { Campaign };