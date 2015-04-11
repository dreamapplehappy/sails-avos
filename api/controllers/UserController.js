
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var AV = require('avoscloud-sdk').AV;
AV.initialize("h8cw946t7vsf9rl7ej229sdexqd2yq2x40wa7nwrazl25piw", "q843hrk31sl3tl3fkdoll85iwm0lwihwjhozgj1pg8tk3kay");
module.exports = {
	'new': function(req, res){
		// res.locals.flash = _.clone(req.session.flash);
		res.view();
		// req.session.flash = {};
	},

	'login': function(req, res){
		res.view();
	},

	'handleLogin': function(req, res, next){
		var username = req.param('name');
		var password = req.param('password');
		AV.User.logIn(username, password, {
			success: function(user) {
				console.log("login success");
				res.redirect('/user/show/' + username);
			},
			error: function(user, error) {
				console.log("login failed");
			}
		});
	},

	create: function(req, res, next){
		var username = req.param('name');
		var email = req.param('email');
		var user = new AV.User();
		user.set("username", username);
		user.set("password", "my pass");
		user.set("email", email);
		user.set("phone", "415-392-0000");

		user.signUp(null, {
			success: function(user) {
				console.log("user create success!");
			},
			error: function(user, error) {
				console.log("Error: " + error.code + " " + error.message);
			}
		});
	},

	show: function(req, res, next) {
		/*User.findOne(req.param('id'), function foundUser (err, user) {
			if(err) return next(err);
			if(!user) return next();

			res.view({
				user: user
			});
		});*/
		var currentUser = AV.User.current();
		if (currentUser) {
			console.log(currentUser.attributes);
			res.view({
				user: currentUser.attributes
			});
		} 
		else {
			console.log("show error!");
		}
	},

	index: function(req, res, next) {
		var query = new AV.Query("TestObject");
		query.equalTo("foo","bar");
		query.find({
			success: function(results) {
				console.log("Successfully retrieved " + results.length + " scores.");
				res.view({
					results: results
				});
			},
			error: function(error) {
				console.log("Error: " + error.code + " " + error.message);
			}
		});
	},

	edit: function(req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if(err) return next(err);
			if(!user) return next('用户不存在！');

			res.view({
				user: user
			});
		});
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

