/**
 * OperateController
 *
 * @description :: Server-side logic for managing operates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var AV = require('avoscloud-sdk').AV;
AV.initialize("b7747uhilejmtsyfgobccj8vhhrevwja5awh8lh3pt0fg5fr", "7sl5pumuxsly3tlbjifv2acjddilu7vzrwg67u8hqxd927hd");
var Group = AV.Object.extend("Group");

module.exports = {

	'addUser': function(req, res, next) {
		res.view();
	},

	'new': function(req, res){
		res.view();
	}
};

