(function(root, factory){
	if(typeof define === 'function' && define.amd){
		define([], factory);
		console.log( factory());
	}else if(typeof module === 'object' && module.exports){
		console.log("module : " +factory());
	    module.exports = factory();
	}else{
		console.log(factory());

		var bsn = factory();
	}
}(this, function(){
	//console.log(this.process.env);
		"use strict";
		var globalObject = typeof global !== 'undefined' ? global : this||window,
    	DOC = document, HTML = DOC.documentElement, body = 'body',
    	BSN = globalObject.BSN = {},
    	supports = BSN.supports = [];
	

		
}));
