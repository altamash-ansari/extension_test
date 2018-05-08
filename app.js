var Built        = require('built-extension-sdk')
var apiKey       = "blt6b46e092677545a0"
var masterKey    = "blt15b734468f3e571a"
var apiHost      = "api.built.io"
var secretKey    = "altamash"
var extensionKey = "blt_ext_default"
var env          = "prod"

switch(env){
	case "dev": {
		// apiKey    = "blt7ff1904c6d3d9219"
		// masterKey = "blta49594c249a48599"
		apiKey    = "blt2965956f893b50bd"
		masterKey = "blt6f4947444ccb6934"
		apiHost   = "dev-api.built.io"
		break;
	}
	case "dev-tp": {
		apiKey    = "blt03e4edbd8910fa5f"
		masterKey = "bltd393443b965b82b3"
		apiHost   = "dev-api.built.io"
		break;
	}
	case "stag": {
		apiKey    = "blt4a6f4db43349fb19"
		masterKey = "blt06ac6499bdf737a3"
		apiHost   = "stag-api.built.io"
		break;
	}
	case "stag-tp": {
		apiKey    = "blt9bacfd9535236d3a"
		masterKey = "bltfe0c433c8dd695f0"
		apiHost   = "stag-api.built.io"
		break;
	}
}

// Initiate application
var app = Built.App(apiKey)
.setHost(apiHost)
.setProtocol("https")
.setMasterKey(masterKey)

var extensionSDK = app.Extension({
	secret_key     : secretKey,
	extension_key	 : extensionKey,
	static         : __dirname + '/client',
	routes         : require('./server/routes')
})

return extensionSDK.start(9000)
