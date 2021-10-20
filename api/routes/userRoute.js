'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // Users Routes
  app.route('/user')
    .get(user.list_all_users)
    .post(user.create_a_user);

  
  app.route('/user/:userId')
    .get(user.read_a_user)
    .post(user.user_login)
    .put(user.update_a_user)
  


};