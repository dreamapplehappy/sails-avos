/**
 * OperateController
 *
 * @description :: Server-side logic for managing operates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var AV = require('avoscloud-sdk').AV;
AV.initialize("b7747uhilejmtsyfgobccj8vhhrevwja5awh8lh3pt0fg5fr", "7sl5pumuxsly3tlbjifv2acjddilu7vzrwg67u8hqxd927hd");
var Group = AV.Object.extend("Group");
var moment = require('moment');

module.exports = {
	'addNewUser': function(req, res, next){
		var curUserName = req.session.username;
		var right = req.body.rightValue;
		var username = req.body.username;
		var password = req.body.password;
		var phone = req.body.phone;
		var email = req.body.email;
		
		var query = new AV.Query(AV.User);
		/*query.equalTo("username", curUserName);
		query.find({
			success: function(currentUser){
				
			},
			error: function(error) {
				console.log("Error: " + error.code + " " + error.message);
			}
		});*/

		res.redirect('/operate/addUser');

	},

	'addUser': function(req, res, next) {
		var username = req.session.username;
		var query = new AV.Query(AV.User);
		query.equalTo("username", username);
		query.find({
			success: function(currentUser){
				query.equalTo("groupId", currentUser[0].attributes.groupId);
				query.find({
					success: function(users){
						for(var i = 0; i < users.length; i++){
							users[i].createdAt = moment(users[i].createdAt).format("YYYY-MM-DD HH:mm:ss");
						}
						res.view({
							users: users
						});
					},
					error: function(error) {
						console.log("Error: " + error.code + " " + error.message);
					}
				});
			},
			error: function(error) {
				console.log("Error: " + error.code + " " + error.message);
			}
		});
	},

	'new': function(req, res){
		res.view();
	}
};

