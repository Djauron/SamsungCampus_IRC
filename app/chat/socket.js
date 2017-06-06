var room = [];
var username = [];
var Chat = require('../model/Chat.js');

module.exports = function (io) {

    io.sockets.on('connection', function (socket, pseudo) {

        socket.on('addroom', function (chan) {
            console.log(chan);
            var newChan = new Chat({chan: chan});
            newChan.save(function (err) {
                if (err) {
                    flash('error', 'erreur');
                } else {

                }
            });
        })
    });
};

// var newChan = new Chat({ chan: request.body.createChan});
// newChan.save(function(err) {
//     if (err) {
//         request.flash('error', 'Le nom de chan est deja utiliser');
//         response.redirect('/chat');
//     } else {
//         request.flash('success', 'Chan cree avec success');
//         response.redirect('/chat');
//     }
// });
// // r
