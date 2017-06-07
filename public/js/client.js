var socket = io.connect('http://localhost:8070');

$('#createC').click(function () {
    var chan = $('#createChan').val();
    socket.emit('addroom', chan);
    $('#createChan').val("");
});

socket.on('failchan', function (data) {
    console.log(data);
    $('.infoUtil').prepend(data);
});

socket.on('valid', function (data) {
    console.log(data);
    $('.infoUtil').prepend(data);
});







socket.on('new_connection', function(pseudo) {
    $('#zone-chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
});


// Chat.find({}, function (err, chan) {
//     if (err || chan.length === 0) {
//         request.flash('error', 'Aucun chan trouver');
//         response.redirect('/chat');
//     } else {
//         response.render("chat", {'username': sess.username, 'chans': chan});
//     }
// });