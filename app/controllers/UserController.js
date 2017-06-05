var User = require('../model/User.js');
var passwordHash = require('password-hash');


exports.inscription = function(request, response){
    response.render("inscription");
};

exports.connexion = function(request, response){
    response.render("connexion");
};

exports.profile = function(request, response){
    var sess = request.session;
    if(sess.username)
    {
        User.find({ username: sess.username }, function (err, users) {
            if (err || users.length === 0) {
                request.flash('error', 'Erreur d\'acces');
                response.redirect('/connexion');
            } else {
                response.render("profile", {"user":users[0],'username':sess.username});
            }
        });
    }
    else
    {
        response.redirect('/connexion');
    }
};

exports.edit = function(request, response){
    var sess = request.session;
    if(sess.username)
    {
        User.find({ username: sess.username }, function (err, users) {
            if (err || users.length === 0) {
                request.flash('error', 'Erreur d\'acces');
                response.redirect('/connexion');
            } else {
                response.render("edit", {"user":users[0], 'username':sess.username});
            }
        });
    }
    else
    {
        response.redirect('/connexion');
    }
};

exports.editUserMdp = function(request, response){
    var sess = request.session;
    if(sess.username)
    {
        User.find({ username: sess.username }, function (err, users) {
            if (err || users.length === 0) {
                request.flash('error', 'Erreur d\'acces');
                response.redirect('/connexion');
            } else {
                response.render("editUserMdp", {"user":users[0], 'username':sess.username});
            }
        });
    }
    else
    {
        response.redirect('/connexion');
    }
};

exports.editMdp = function(request, response){
    var sess = request.session;
    if(sess.username)
    {
        if(request.body.editPassword !== "" && request.body.editPasswordV !== "")
        {
            var hashedPassword = passwordHash.generate(request.body.editPassword);
            User.findOneAndUpdate(sess.username,{ password: hashedPassword }, {new:true}, function (err, users) {
                if (err || users.length === 0) {
                    request.flash('error', 'Erreur lors de l\'edit');
                    response.redirect('/edit');
                } else {
                    sess.username = users.username;
                    request.flash('success', 'Ok');
                    response.redirect("/profile");
                }
            });
        }
        else
        {
            request.flash('error', 'Un des deux champs est vide.');
            response.redirect('/edit');
        }
    }
    else
    {
        response.redirect('/connexion');
    }
};


exports.editUser = function(request, response){
    var sess = request.session;
    if(sess.username)
    {
        if(request.body.editUsername !== "" && request.body.editEmail !== "")
        {
            User.findOneAndUpdate(sess.username,{ username: request.body.editUsername, email: request.body.editEmail}, {new:true}, function (err, users) {
                if (err || users.length === 0) {
                    request.flash('error', 'Erreur lors de l\'edit');
                    response.redirect('/edit');
                } else {
                    sess.username = users.username;
                    request.flash('success', 'Ok');
                    response.redirect("/profile");
                }
            });
        }
        else
        {
            request.flash('error', 'Un des deux champs est vide.');
            response.redirect('/edit');
        }
    }
    else
    {
        response.redirect('/connexion');
    }
};

exports.addUser = function(request, response) {

    if(request.body.email !== "" && request.body.username !== "" && request.body.password !== "")
    {
        if(request.body.password === request.body.confirm)
        {
            var hashedPassword = passwordHash.generate(request.body.password);

            var newUser = new User({ username: request.body.username, password: hashedPassword, email: request.body.email});
            newUser.save(function(err) {
                if (err) {
                    request.flash('error', 'Le pseudo ou l\'email est deja utiliser');
                    response.redirect('/inscription');
                } else {
                    request.flash('success', 'Compte cree avec success');
                    response.redirect('/connexion');
                }
            });
        }
        else
        {
            request.flash('error', 'Les mots de passes ne sont pas identique');
            response.redirect('/inscription');
        }
    }
    else
    {
        request.flash('error', 'Veuillez remplir tout les champs');
        response.redirect('/inscription');
    }
};

exports.verifUser = function(request, response){
    if(request.body.usernameLog !== "" && request.body.userPassword !== "")
    {
            User.find({ username: request.body.usernameLog}, function (err, users) {
                if(users.length !== 0)
                {
                    var hashed = passwordHash.verify(request.body.userPassword, users[0].password);
                }
                if (err || users.length === 0 || hashed === false) {
                    request.flash('error', 'Username ou Mot de passe incorrect');
                    response.redirect('/connexion');
                } else {
                    var sess = request.session;
                    sess.username = users[0].username;
                    request.flash('success', 'Connecter avec succes');
                    response.redirect('/chat');
                }
        });

    }
    else
    {
        request.flash('error', 'Username ou Mot de passe incorrect');
        response.redirect('/connexion');
    }
};