exports.chat = function(request, response){
    var sess = request.session;
    // if(sess.username)
    // {
        response.render("chat", {'username':sess.username});
    // }
    // else
    // {
    //     response.redirect('/connexion');
    // }
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