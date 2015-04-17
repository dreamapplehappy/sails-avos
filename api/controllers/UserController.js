
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var AV = require('avoscloud-sdk').AV;
AV.initialize("b7747uhilejmtsyfgobccj8vhhrevwja5awh8lh3pt0fg5fr", "7sl5pumuxsly3tlbjifv2acjddilu7vzrwg67u8hqxd927hd");
var Group = AV.Object.extend("Group");

module.exports = {

	index: function(req, res, next) {
		res.view();
	},

	'new': function(req, res){
		res.view();
	},

	'login': function(req, res){
		res.view();
	},

	'logout': function(req, res){
		AV.User.logOut();
		var currentUser = AV.User.current();
		req.session.username = null;
		res.redirect("/user/");
	},

	'handleLogin': function(req, res, next){
		var username = req.param('username');
		var password = req.param('password');
		console.log(username+"---"+password);
		AV.User.logIn(username, password, {
			success: function(user) {
				req.session.username = username;
				console.log("login success\n"+req.session.username);
				res.redirect('/user/show/' + username);
			},
			error: function(user, error) {
				console.log(error);
			}
		});
	},

	create: function(req, res, next){
		var co = req.param('co');
		var username = req.param('username');
		var phone = req.param('phone');
		var email = req.param('email');
		var password = req.param('password');

		var user = new AV.User();
		var group = new Group();

		group.set("name",co);
		user.set("username",username);
		// user.set("mobilePhoneNumber",phone);
		user.set("phone",phone);
		user.set("email",email);
		user.set("password",password);

		group.save(null, {
			success: function(group) {
				console.log('New object created with objectId: ' + group.id);
				console.log("-------------------------------------------");
				user.set("groupId",group.id);
				user.signUp(null, {
					success: function(user) {
						group.set("parentGroupId",group.id);
						group.set("rootGroupId",group.id);
						group.set("userId",user.id);
						group.save();
						res.redirect("/user/show/"+user.attributes.username);
					},
					error: function(user, error) {
						console.log("User signUp Error: " + error.code + " " + error.message);
					}
				});
			},
			error: function(group, error) {
				console.log('Failed to create new object, with error code: ' + error.message);
			}
		});
	},

	show: function(req, res, next) {
		var currentUser = AV.User.current();
		if (currentUser) {
			res.view({
				user: currentUser.attributes
			});
		} 
		else {
			console.log("show error!");
		}
	},

	edit: function(req, res, next) {
		console.log(req.session);
		res.view();
	},

	update: function(req, res, next) {
		User.update(req.param('id'), req.params.all(), function userUpdated (err) {
			if(err) {
				return res.redirect('/user/edit/' + req.param('id'));
			}

			res.redirect('/user/show/' + req.param('id'));
		});
	},

	destroy: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if(err) return next(err);

			if(!user) return next('用户不存在！');

			User.destroy(req.param('id'), function userDestroyed (err) {
				if(err) return next(err);
			});

			res.redirect('/user');
		});
	}

};

