const fs = require('fs');
const path = require('path');


try {
	fs.rmSync(__dirname + '/bundles', { recursive: true, force: true });
	fs.rmSync(__dirname + '/dist', { recursive: true, force: true });
	console.log('Good');
}
catch (e) {
	console.error(e);
}


