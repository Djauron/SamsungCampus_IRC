var socket = io.connect('http://localhost:8070');

var pseudo = '';
// On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
$('#div_chat').hide();

$('#envoi_pseudo').click(function() {
    var pseudo = document.getElementById('pseudo_new').value;
    if (pseudo) {
        $('#div_chat').show();
        $('#pseudo_new').hide();
        $('#envoi_pseudo').hide();
        $('#error_message').hide();
    } else {
        document.getElementById('error_message').innerHTML = "Veuillez rentree un pseudo !";
        return false;
    }

    socket.emit('nouveau_client', pseudo);
    document.title = pseudo + ' - ' + document.title;

    // Quand on reçoit un message, on l'insère dans la page
    socket.on('message', function(data) {
        insereMessage(data.pseudo, data.message)
    })

    // Quand un nouveau client se connecte, on affiche l'information
    socket.on('nouveau_client', function(pseudo) {
        $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
    })

    // Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
    $('#formulaire_chat').submit(function() {
        var message = $('#message').val();
        socket.emit('message', message); // Transmet le message aux autres
        insereMessage(pseudo, message); // Affiche le message aussi sur notre page
        $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
        return false; // Permet de bloquer l'envoi "classique" du formulaire
    });

    // Ajoute un message dans la page
    function insereMessage(pseudo, message) {
        $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> : ' + message + '</p>');
    }
});