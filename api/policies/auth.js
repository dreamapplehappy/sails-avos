/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var AV = require('avoscloud-sdk').AV;
AV.initialize("b7747uhilejmtsyfgobccj8vhhrevwja5awh8lh3pt0fg5fr", "7sl5pumuxsly3tlbjifv2acjddilu7vzrwg67u8hqxd927hd");
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  var currentUser = AV.User.current();
  if (currentUser) {
    return next()+currentUser;
  }

  

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
