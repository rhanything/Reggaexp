const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
function server(config) {
	const app = express();
	app.use(bodyParser.json());
	// eslint-disable-next-line no-undef
	app.use(express.static(__dirname));
	app.use(cors());

	app.listen(config.port, () => {
		console.log(`Listening on port ${config.port}!`);
	});
	return app;
}

module.exports = {
	server,
};
