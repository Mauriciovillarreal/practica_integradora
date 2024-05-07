const { Schema, model } = require('mongoose');

const chatsSchema = new Schema ({
    email: {
        type: String,
    },
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatsModel = model('message', chatsSchema);

module.exports = { chatsModel };