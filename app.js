var Built = require('built-extension-sdk')
var apiKey = "bltc3d662efa9944ee5"
var masterKey = "bltcca971a54cfb475c"
var apiHost = "stag-api.built.io"
var env     = "stag"

if(env === "dev"){
	apiKey = "blt7ff1904c6d3d9219"
	masterKey = "blta49594c249a48599"
	apiHost = "dev-api.built.io"
}

// Initiate application
var app = Built.App(apiKey)
// .setHost('localhost')
// .setPort(8000)
.setHost(apiHost)
.setProtocol("https")
// .setPort(80)
.setMasterKey(masterKey)

var extensionSDK = app.Extension({
	secret_key     : 'altamash',
	extension_key	 : 'blt_ext_default',
	static         : __dirname + '/client',
	routes         : require('./server/routes')
})

return extensionSDK.start(9000)
