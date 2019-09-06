(function(root, factory){
	if(typeof define === 'function' && define.amd){
		define([], factory);
		//console.log( factory());
	}else if(typeof module === 'object' && module.exports){
		console.log("module : " +factory());
	    module.exports = factory();
	}else{
		console.log(factory());

		var bsn = factory();
	}
}(this, function(){
	"use strict";	

	var sendData = function(){

		var XHR = new XMLHttpRequest();
		var form = document.getElementById("myForm"); 

    	// Bind the FormData object and the form element
   	 	var FD = new FormData(form);
   	 	
    	// Define what happens on successful data submission
   		XHR.addEventListener("load", function(event) {
      		alert(event.target.responseText);
    	});

    	// Define what happens in case of error
    	XHR.addEventListener("error", function(event) {
      		alert('Oops! Something went wrong.');
    	});

		XHR.open("POST", "http://localhost:3000/api/add");
		XHR.send(FD);
	}

	return {
		sendData: sendData 
		}
	}

));