var Chat = require('../model/Chat.js');
var User = require('../controllers/UserController');
var room = [];
var usertab = [];

module.exports = function (io) {

    io.on('connection', function (client) {

        function infosChan()
        {
            Chat.find({}, function (err, chan) {
                if(chan.length !== 0)
                {

                    client.emit('infoschan', chan);

                }
            });
        }

        var user = User.getUsername();

        if(user === "" || user === undefined) return false;

        usertab.push(user);
        client.pseudo = user;
        client.broadcast.emit('new_user', user, usertab);
        client.emit('new_user', user, usertab);

        infosChan();

        client.on('message', function (message) {
            client.emit('message', {pseudo: client.pseudo, message: message});
            client.broadcast.emit('message', {pseudo: client.pseudo, message: message});
        });

        client.on('affChan', function () {
            infosChan()
        });

        client.on('addroom', function (chan) {
            console.log(chan);
            var newChan = new Chat({chan: chan});
            newChan.save(function (err) {
                if (err) {
                    client.emit('failchan', 'Chan existe deja');
                } else {
                    client.emit('valid', 'Chan cree');
                }
            });
        });

        client.on('disconnect', function () {
            usertab.splice(usertab.indexOf(user), 1);
            client.broadcast.emit('disconnectUser', user, usertab);
            console.log(usertab);
        });

    });
};
