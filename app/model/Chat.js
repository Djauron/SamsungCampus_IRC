var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    chan: { type: String, required: true, unique: true },
    createdAt: {type: Date, default: Date.now}
});


var Chat = mongoose.model('chats', chatSchema);

module.exports = Chat;