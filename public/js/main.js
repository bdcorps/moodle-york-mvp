$(document).ready(function() {
	let date = new Date();

	let dd = date.getDate();
	let mm = date.getMonth() + 1;
	let yy = date.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	$("#currentDate").html(mm + '/' + dd + '/' + yy);
	console.log(message);
	// $("#chatbox-body").append("<p>"+message+"</p>");
});



$("#submit-conversation").on('submit', function(e) {
	// axios({
	// 	method: 'post',
	// 	url: 'https://moodle-lite-mvp-nodered.mybluemix.net/testing',
	// 	data: {
	// 		message: $("#userInput").val(),
	// 	}
	// })
	// .then(function(res) {
	// 	console.log(res);
	// });
	
});