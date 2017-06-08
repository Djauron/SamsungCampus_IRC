var socket = io.connect('http://localhost:8070');

$('#createC').click(function () {
    var chan = $('#createChan').val();
    socket.emit('addroom', chan);
    $('#createChan').val("");
});

socket.on('failchan', function (data) {
    $('.infoUtil').prepend(data);
});

socket.on('valid', function (data) {
    $('.infoUtil').prepend(data);
});

socket.on('infoschan', function (data) {
    $('.infoChan').prepend(data + "<br>");
});


socket.on('new_user', function(pseudo) {
    $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
});


$('#validMessage').click(function () {
    sendMessage();
});

$('#formulaire_chat').keypress(function(e) {
    if(e.which == 13) {
        sendMessage();
    }
});

function sendMessage()
{
    var message = $('#formulaire_chat').val();
    socket.emit('message', message);
    $('#formulaire_chat').val('').focus();
    return false;
}

socket.on('message', function(data) {
    insereMessage(data.pseudo, data.message)
});


socket.on('disconnectUser', function(pseudo) {
    $('#zone_chat').prepend('<p><em>' + pseudo + ' a quitter le Chat !</em></p>');
});

function insereMessage(pseudo, message) {
    $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> dit: ' + message + '</p>');
}