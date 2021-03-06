var when = require('when')

module.exports = {
	"/functions/swapnil": {
		GET: function(req, res){
			this.resSuccess(req, res, {
				swapnil: "is awesome"
			})
		}
	},
	"/functions/chinu": {
		GET: function(req, res){
			this.resSuccess(req, res, {
				chinu: "happy birthdayyy"
			})
		}
	},
	"/functions/smita": {
		GET: function(req, res){
			this.resSuccess(req, res, {
				smita: "is awesome"
			})
		}
	},
	"/functions/altamash": {
		GET: function(req, res){
			req.logger.log("altamash called")
			this.resSuccess(req, res, {
				altamash: "ansari :D"
			})
		}
	},
	"/functions/rohini": {
		GET: function(req, res){
			this.resSuccess(req, res, {
				Rohini: "is aagau :D"
			})
		}
	},
	"/functions/abhijeet": {
		GET: function(req, res){
			this.resSuccess(req, res, {
				working: "GET call"
			})
		},
		POST: function(req, res){
			this.resSuccess(req, res, {
				working: "Post call"
			})
		},
		PUT: function(req, res){
			this.resSuccess(req, res, {
				working: "PUT call"
			})
		}
	},
	"/functions/createPerson": {
		POST: function(req, res){
			req.logger.log("request payload", req.payload)
			req.logger.log("App options", req.builtApp.options)
			var that = this
			req.builtApp.Class('person').Object(req.payload.data)
			.save()
			.then(function(person){
				return that.resSuccess(req, res, person)
			})
			.catch(function(err){
				console.log(err, "=========")
			})
		}
	},
	"/functions/test" : {
		POST: function(req, res){
			var that = this
			req.builtApp = req.builtApp

			var response = {}

			return req.builtApp.Class('person').Object(req.payload.data.person)
			.save()
			.then(function(person){
				response['person'] = person.toJSON()
				return req.builtApp.Class('address').Object(req.payload.data.address)
				.save()
			})
			.then(function(address){
				response['address'] = address.toJSON()
				return that.resSuccess(req, res, response)
			})
		}
	},
	"/functions/validError" : {
		POST: function(req, res){
			var that = this
			return that.resError(req, res, {
				name: "is not a string"
			})
		}
	},
	"/functions/throwError" : {
		POST: function(req, res){
			var that = this
			throw {
				name: "is not a string"
			}
		}
	},
	"/functions/timeOut" : {
		POST: function(req, res){
			var that = this
			return {
				"timeout":"aaaa"
			}
		}
	},
	"/functions/anyAuthLogin" : {
		POST : function(req, res) {
			var that     = this
			var builtApp = req.builtApp

			builtApp = builtApp.setMasterKey("blta49594c249a48599")

			req.logger.log(req.payload)

			var User = builtApp.User

			var query = builtApp.Class("built_io_application_user").Query()

			query = query.where("username", req.payload.data.username)

			return User.generateAccessToken(query, false, {
				username: req.payload.data.username
			})
			.then(function(user) {
				req.logger.log(user.toJSON())

				return that.resSuccess(req, res, user.toJSON())
			})
			.catch(function(err) {
				req.logger.log(err)
				return that.resError(req, res, err)
			})
		}
	},
	"/classes/person/objects": {
		POST: {
			_pre: function(req, res) {
				req.logger.log("person hook pre")
				req.bobjekt = req.bobjekt.set("age", 44)
				req.bobjekt = req.bobjekt.setReferenceWhere("address", {
					"city": "Mumbai"
				})
				return this.resSuccess(req, res)
			},
			_post: function(req, res) {
				req.logger.log("person hook post")
				req.bobjekt['new_field'] = "new_value"
				return this.resSuccess(req, res)
			}
		}
	}/*,
	"/classes/person/objects/:objectUid": {
		PUT:{
			_pre: function(req, res){
				req.logger.warn("warn")
				req.bobjekt = req.bobjekt.set("name", "smita")
				return when.resolve()
			},
			_post: function(req, res){
				req.bobjekt['extra_field'] = "added"
				return when.resolve()
			}
		},
		GET: {
			_post: function(req, res){
				req.bobjekt.name = "bindok_"+req.bobjekt.name
				return when.resolve()
			}
		},
		DELETE : {
			_pre: function(req, res){
				console.log("_pre")
				return when.resolve()
			},
			_post: function(req, res){
				console.log("_post")
				var defered = utils.Promise.defer()
				setTimeout(function(){
					console.log("Timeout completed")
					defered.resolve()
				},1000)

				return defered.promise
			}
		}
	}*/
}
