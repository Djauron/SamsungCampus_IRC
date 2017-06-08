var Chat = require('../model/Chat.js');

exports.chat = function(request, response) {
    var sess = request.session;
    // if(sess.username)
    // {
    // }
    // else
    // {
    //     response.redirect('/connexion');
    // }
    response.render("chat", {'username':sess.username});
};




exports.disconnect = function(request, response){
    var sess = request.session;
    if(sess.username) {
        request.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                response.redirect('/connexion');
            }

        });
    }
    else response.redirect('/connexion');
};