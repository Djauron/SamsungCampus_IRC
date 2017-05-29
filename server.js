var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var ent = require('ent');
var fs = require('fs');

app.set('view engine', 'ejs');

app.use(express.static('public'));

// Chargement du fichier index.html affiché au client
app.get('/', function(req, res) {
    res.render('index');
});

io.sockets.on('connection', function(socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function(message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', { pseudo: socket.pseudo, message: message });
    });
});

server.listen(8070);