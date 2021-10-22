'use strict';
module.exports = function(app) {
  var dest = require('../controllers/destController');

  //Dest
  app.route('/dest/list')
    .post(dest.dest_list);

  app.route('/dest/info')
    .post(dest.dest_info);
};