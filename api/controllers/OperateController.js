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
 		if(right === "管理员"){
 			right = true;
 		}
 		else{
 			right = false;
 		}
 		var dep = req.body.depValue;
 		var username = req.body.username;
 		var password = req.body.password;
 		var phone = req.body.phone;
 		var email = req.body.email;

 		console.log(right+'\n'+dep+'\n'+username+'\n'+password+'\n'+phone+'\n'+email);

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
	var dataUsers,dataDeps;	
	var username = req.session.username;
	var query = new AV.Query(AV.User);
	var groupQuery = new AV.Query(Group);
	query.equalTo("username", username);
	query.find({
		success: function(currentUser){
			var curGroupId = currentUser[0].attributes.groupId;
			groupQuery.equalTo('parentGroupId', curGroupId);
			groupQuery.find({
				success: function(dataDeps){
					console.log(dataDeps);
				},
				error: function(error){
					console.log("Group Error: " + error.code + " " + error.message);
				}
			});
				//
				query.equalTo("groupId", curGroupId);
				query.find({
					success: function(users){
						for(var i = 0; i < users.length; i++){
							users[i].createdAt = moment(users[i].createdAt).format("YYYY-MM-DD HH:mm:ss");
						}
						dataUsers = users;
						res.view({
							dataUsers: dataUsers
						});
					},
					error: function(error) {
						console.log("Find User Error: " + error.code + " " + error.message);
					}
				});
			},
			error: function(error) {
				console.log("Find Current User Error: " + error.code + " " + error.message);
			}
		});
},

'new': function(req, res){
	res.view();
}
};

