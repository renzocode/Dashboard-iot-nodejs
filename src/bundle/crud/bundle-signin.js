require('../../css/theme.css');
require('../../css/prism.css');
require('../../css/signin.css');


const createjs =  require('../../js/signin');
/*const bootstrap_create = require('../../js/bootstrap-native-v4');*/

/*
window.addEventListener("load", function () {
	function sendData() {
    	var XHR = new XMLHttpRequest();
    	var form = document.getElementById("myForm");
    	XHR.open("POST", "http://localhost:3000/api/add");
 		XHR.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    	var data = {
            "author":form.elements["author"].value,
            "title": form.elements["title"].value,
            "content" : form.elements["content"].value,
            "comment" : form.elements["comment"].value,
            "img" : form.elements["img"].value
        };
        console.log(typeof form.elements["img"].value);
    	// The data sent is what the user provided in the form
    	XHR.send(JSON.stringify(data));
  	}
	var form = document.getElementById("myForm");
  	// ...and take over its submit event.
  	form.addEventListener("submit", function (event) {
    	event.preventDefault();
    	sendData();

  });
});

*/