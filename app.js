var Built = require('built-extension-sdk')

// Initiate application
var app = Built.App('bltd470ad1e7ce19b96')
// .setHost('localhost')
// .setPort(8000)
.setHost("test-stag-api.built.io")
.setProtocol("https")
// .setPort(80)
.setMasterKey('bltd6b6eedeff10f9b0')

var extensionSDK = app.Extension({
	secret_key     : 'altamash',
	extension_key	 : 'blt_ext_default',
	static         : __dirname + '/client',
	routes         : require('./server/routes')
})

return extensionSDK.start(9001)
