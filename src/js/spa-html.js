(function(root, factory){
	if(typeof define === 'function' && define.amd){
		define(['./jq/jquery-3.4.1'], factory);
	}else if(typeof module === 'object' && module.exports){
		console.log("module : " +factory());
		console.log("module");
	    module.exports = factory();
	}else{
		console.log(factory());
		var bsn = factory();
	}
}(this, function($){
		"use strict";
		$(function(){
			spa.model.initModule();
			spa.shell.initModule($('#spa'));
		});
}));
