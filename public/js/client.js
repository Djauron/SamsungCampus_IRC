var socket = io.connect('http://localhost:8070');

$('#createC').click(function () {
    var chan = $('#createChan').val();
    socket.emit('addroom', chan);
    $('#createChan').val("");
    socket.emit('affChan');
});

socket.on('failchan', function (data) {
    $('.infoUtil').html("");
    $('.infoUtil').prepend(data);
});

socket.on('valid', function (data) {
    $('.infoUtil').html("");
    $('.infoUtil').prepend(data);
});

socket.on('infoschan', function (data) {
    $('#infoChan').empty();
    for(var i = 0; i <= data.length - 1; i++)
    {
        $('#infoChan').prepend(data[i].chan + "<br>");
    }
    console.log(data + "infochan here");
});


socket.on('new_user', function(pseudo, tab) {
    if(tab.length >= 2)
    {
        $('#presentName').html("");
    }
    for(var i = 0; i <= tab.length - 1; i++)
    {
        $('#presentName').append(tab[i] + "<br>");
    }
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


socket.on('disconnectUser', function(pseudo, tab) {
    $('#presentName').html("");
    for(var i = 0; i <= tab.length - 1; i++)
    {
        $('#presentName').append(tab[i] + "<br>");
    }
    $('#zone_chat').prepend('<p><em>' + pseudo + ' a quitter le Chat !</em></p>');
});

function insereMessage(pseudo, message) {
    $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> dit: ' + message + '</p>');
}