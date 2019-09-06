/*
 * jQuery plugin to manage the URI anchor component ("hash fragmant")
 *
 * Copyright (c) 2013-2015 Michael S. Mikowski
 * (mike[dot]mikowski[at]gmail[dotcom])
 *
 * Dual licensed under the MIT or GPL Version 2
 * http://jquery.org/license
 *
 * Versions
 *  1.1.1-1.1.3 - Initial jQuery plugin site releases
 *  1.2.1-1.3.3 - Updated documentation, minor bug fixes
*/
/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $: spa*/

(function(root, factory){
	if(typeof define === 'function' && define.amd){
		define(['./jq/jquery-3.4.1'], factory);
	}else if(typeof module === 'object' && module.exports){
		console.log("module : " +factory());
	    module.exports = factory();
	}else{
		console.log(factory());
		var bsn = factory();
	}
}(this, function($){
	//console.log(this.process.env);
		"use strict";
		var globalObject = typeof global !== 'undefined' ? global : this||window,
    	DOC = document, HTML = DOC.documentElement, body = 'body',
    	BSN = globalObject.BSN = {},
    	supports = BSN.supports = [];
		
		spa.util_b = (function(){
			var 
				configMap = {
					regex_encode_html : /[&"'><]/g,
					regex_encode_noamp : /["'><]/g,
					html_encode_map : {
						'&' : '&#38;',
						'"' : '&#34;',
						"'" : '&#39;',
						">" : '&#62;',
						'<' : '&#60;'
					}
				},	
				decodeHtml, encodeHtml, getEmSize;
				configMap.encode_noamp_map = $.extend({}, configMap.html_encode_map);
				delete configMap.encode_noamp_map['&'];

				decodeHtml = function(str){
					return $('<div/>').html(str || '').text();
				};

				encodeHtml = function(input_arg_str, exclude_amp){
					var 
						input_str = String(input_str),
						regex, lookup_map;
						if(exclude_amp){
							lookup_map = configMap.encode_noamp_map;
							regex = configMap.regex_encode_noamp;
						}else{
							lookup_map =configMap.html_encode_map;
							regex = configMap.regex_encode_html;
						}
						return input_str.replace(regex,
							function(match, name){
								return lookup_map[match] || '';
							});
				};

				getEmSize = function(elem){
					return Number(getComputedStyle(elem, '').fontSize.match(/\d*\.?\d*/)[0]);
				};

				return {
					decodeHtml : decodeHtml,
					encodeHtml : encodeHtml,
					getEmSize : getEmSize
				};
			})();

		return spa.util_b;
}));




















