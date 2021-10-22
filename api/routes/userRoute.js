'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // Users 
  app.route('/user')
    .get(user.list_all_users)

  app.route('/user/create')
    .post(user.user_create);

  app.route('/user/login')
    .post(user.user_login);

  app.route('/user/activate')
    .post(user.user_activate)

  app.route('/user/password')
    .post(user.user_change_password)

  app.route('/user/forget')
    .post(user.forget_password)

  app.route('/user/reset')
    .post(user.reset_password)
};