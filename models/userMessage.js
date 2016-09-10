var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	userid:{
		type: String,
		required:true
	},
		text:{
			type:String,
			required:true
		},
		location:{
			lat:{
				type:String,
				required:true
				},
			long:{
				type:String,
				required:true
				}
		},
	createddate:{
		type:Date,
		default:Date.now
	}
});

var User = mongoose.model('User', userSchema);
module.exports = User;

// //get Messages
// module.exports.Messages = function(callback, package){
// 	console.log('here');
// 	// User.find(callback).limit(package);
// }

// //insert
// module.exports.Insert = function(callback,uuid,message,gps,date){
// 	User.insert(save);
// };