var UserController = require('../controllers/UserController');
var ChatController = require('../controllers/ChatController');

module.exports = function(app) {
    app.get('/', UserController.connexion);
    app.get('/connexion', UserController.connexion);
    app.get('/inscription', UserController.inscription);
    app.post('/addUser', UserController.addUser);
    app.post('/verifUser', UserController.verifUser);
    app.get('/chat', ChatController.chat);
    app.get('/disconnect', ChatController.disconnect);
    app.get('/profile', UserController.profile);
    app.get('/edit', UserController.edit);
    app.get('/editUserMdp', UserController.editUserMdp);
    app.post('/editUser', UserController.editUser);
    app.post('/editMdp', UserController.editMdp);
};