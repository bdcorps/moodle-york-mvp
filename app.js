'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cfenv = require('cfenv');
let request = require("request");
let axios = require('axios');

var watson = require('watson-developer-cloud'); // watson sdk

var conversation = new watson.ConversationV1({
	// If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
	// After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
	username: process.env.CONVERSATION_USERNAME || '<username>',
	password: process.env.CONVERSATION_PASSWORD || '<password>',
	version_date: '2018-02-16'
});

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('main.ejs', {
		payload: null,
		question: null
	});
});

app.post('/send-convo', function(req, res) {
	const message = req.body.userInput;

	// axios({
	// 	method: 'post',
	// 	url: 'https://moodle-lite-mvp-nodered.mybluemix.net/testing',
	// 	data: {
	// 		message: message
	// 	}
	// })
	// .then(function(response) {
	// 	console.log(response);
	// 	res.send({
	// 		payload: response
	// 	})
	// });
	console.log('message: ' + message);
	var options = { method: 'POST',
		url: 'https://moodle-lite-mvp-nodered.mybluemix.net/testing',
		qs: { message: message },
		headers: 
		 { 'postman-token': 'a5430559-484b-014a-41bc-e93cead23a02',
			 'cache-control': 'no-cache' } };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		res.render('main.ejs',{
			question: message,
			payload: body
		});
	});
})


var appEnv = cfenv.getAppEnv();
// console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});