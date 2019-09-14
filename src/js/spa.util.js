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
		
		spa.util = (function(){
			var makeError, setConfigMap;
			makeError = function(name_text, msg_text, data){
				var error = new Error();
				error.name = name_text;
				error.message = msg_text;
				if(data){
					error.data = data;
				}
				return error;
			};

			setConfigMap = function(arg_map){
				var input_map = arg_map.input_map,
				settable_map = arg_map.settable_map,
				config_map = arg_map.config_map,
				key_name, error;
				//console.log(arg_map.input_map);
				//console.log(arg_map.settable_map);
				for(key_name in input_map){
					if(input_map.hasOwnProperty(key_name)){
						if(settable_map.hasOwnProperty(key_name)){
							
							config_map[key_name] = input_map[key_name];
						}
						else{
							error = makeError('Bad Input',
								'setting config key |' + key_name +
								'| is not supported');
							throw error;
						}
					}
				}
				//console.log(config_map);
			}

			return {
				makeError : makeError,
				setConfigMap : setConfigMap
			}
		}());
		return spa.util;
}));















