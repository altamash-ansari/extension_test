var Built = require('built-extension-sdk')

// Initiate application
var app = Built.App('bltc3d662efa9944ee5')
// .setHost('localhost')
// .setPort(8000)
.setHost("stag-api.built.io")
.setProtocol("https")
// .setPort(80)
.setMasterKey('bltcca971a54cfb475c')

var extensionSDK = app.Extension({
	secret_key     : 'altamash',
	extension_key	 : 'blt_ext_default',
	static         : __dirname + '/client',
	routes         : require('./server/routes')
})

return extensionSDK.start(9000)
