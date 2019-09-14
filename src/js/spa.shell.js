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
/*global jQuery */
(function(root, factory){
	if(typeof define === 'function' && define.amd){
		define(['./jq/jquery-3.4.1'], factory);		
	}else if(typeof module === 'object' && module.exports){
		console.log("module : " +factory());
	    module.exports = factory();
	}else{
		var bsn = factory();
	}
}(this, function($){

		spa.shell = (function (){
			var globalObject = typeof global !== 'undefined' ? global : this||window,
    		DOC = document, HTML = DOC.documentElement, body = 'body',
    		BSN = globalObject.BSN = {},
    		supports = BSN.supports = [];
		
			var configMap = {
				anchor_schema_map : {
					chat : { opened : true, closed : true },
					main : { manage : true, azure : true,
							 plc : true , nodemcu : true,
							 nodesnap7 : true}
				},
				main_html : String() 
				+ '<div id="spa-shell-head-id" class="spa-shell-head">'
					+'<div id="spa-shell-head-id">Navigation</div>'
				+ '</div>'
				+ '<div id="spa-shell-main-id" class="row spa-shell-main">'
					+ '<div id="spa-shell-main-nav-id" class="col-2 spa-shell-main-nav">sidebar</div>'
					+ '<div id="spa-shell-main-content-id" class="col-8 spa-shell-main-content"></div>'
					+ '<div id="spa-shell-main-update-id" class="col-2 spa-shell-main-update">Update</div>'
				+ '</div>'
				+ '<div id="spa-shell-footer-id" class="spa-shell-footer">Footer</div>'
				
			},
			stateMap =  { 
				anchor_map : {}
			},
			jqueryMap = {},
			copyAnchorMap, setJqueryMap,
			changeAnchorPart, onHashchange,
			onTapAcct, onLogin, onLogout,
			setChatAnchor, 

			setMainAnchor, 


			initModule;

			

			setJqueryMap = function(){
				var $container = stateMap.$container;
				//console.log(s);
				jqueryMap = { 
					$container: $container,
					$acct    :  $container.find('.spa-shell-head-acct'),
					$nav     :  $container.find('.spa-shell-main-nav'),
					$mainnav :  $container.find('.spa-shell-main-nav')
				};
			};

			copyAnchorMap = function(){
				return $.extend(true, {}, stateMap.anchor_map);
			};
			//event handlers
			onTapAcct = function(event){
				var acct_text, user_name , user = spa.model.people.get_user();
				if(user.get_is_anon()){
					user_name = prompt('Please sign-in');
					spa.model.people.login(user_name);
					jqueryMap.$acct.text('... processing ...');
				}else{
					spa.model.people.logout();
				}
				return false;
			};

			onLogin = function(event, login_user){
				jqueryMap.$acct.text(login_user.name);
			};

			onLogout = function(event, logout_user){
				jqueryMap.$acct.text('Please sign-in');
			}
			

			changeAnchorPart =  function(arg_map){
				var anchor_map_revise = copyAnchorMap(),
				bool_return   = true,

				key_name, key_name_dep;
				console.log("changeAnchor");
				for(key_name in arg_map){
					if(arg_map.hasOwnProperty(key_name)){
						console.log(key_name);
						if(key_name.indexOf('_') === 0){
							continue;
						}
						anchor_map_revise[key_name] = arg_map[key_name];
						key_name_dep = '_' + key_name;
						if(arg_map[key_name_dep]){
							anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
						}
						else{
							delete anchor_map_revise[key_name_dep];
							delete anchor_map_revise['_s' + key_name_dep];
						}
					}
				}

				try{
					$.uriAnchor.setAnchor(anchor_map_revise);
				}catch(error){
					$.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
					bool_return = false;
				}
				return bool_return;
			};
			/*
			onHashchange = function(event){
				var _s_chat_previous, _s_chat_proposed, s_chat_proposed,
				anchor_map_proposed,
				is_ok = true,
				anchor_map_previous = copyAnchorMap();

				try{
					anchor_map_proposed = $.uriAnchor.makeAnchorMap();
					console.log(anchor_map_proposed);
				}catch(error){
					$.uriAnchor.setAnchor(anchor_map_previous, null, true);
					return false;
				}

				stateMap.anchor_map = anchor_map_proposed;
				_s_chat_previous = anchor_map_previous._s_chat;
				_s_chat_proposed = anchor_map_proposed._s_chat;

				if(!anchor_map_previous || _s_chat_previous !== _s_chat_proposed){
					s_chat_proposed = anchor_map_proposed.chat;
					switch(s_chat_proposed){
						case 'opened':
							is_ok = spa.chat.setSliderPosition('opened');
						break;
						case 'closed':
							is_ok = spa.chat.setSliderPosition('closed');
						break;
						default:
							spa.chat.setSliderPosition('closed');
							delete anchor_map_proposed.chat;
							$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
					}
				}

				if(!is_ok){
					if(anchor_map_previous){
						$.uriAnchor.setAnchor(anchor_map_previous, null, true);
						stateMap.anchor_map = anchor_map_previous;
					}else{
						delete anchor_map_proposed.chat;
						$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
					}
				}
				return false;
			}
			*/
			onHashchange = function(event){
				var _s_chat_previous, _s_chat_proposed, s_chat_proposed,
				anchor_map_proposed,
				is_ok = true,
				anchor_map_previous = copyAnchorMap();

				try{
					anchor_map_proposed = $.uriAnchor.makeAnchorMap();
					console.log(anchor_map_proposed);
				}catch(error){
					$.uriAnchor.setAnchor(anchor_map_previous, null, true);
					return false;
				}

				stateMap.anchor_map = anchor_map_proposed;
				_s_main_previous = anchor_map_previous._s_main;
				_s_main_proposed = anchor_map_proposed._s_main;

				if(!anchor_map_previous || _s_main_previous !== _s_main_proposed){
					s_main_proposed = anchor_map_proposed.main;
					switch(s_main_proposed){
						case 'manage':
							is_ok = spa.main.setSliderPosition('manage');
						break;
						case 'azure':
							is_ok = spa.main.setSliderPosition('azure');
						break;
						case 'plc':
							is_ok = spa.main.setSliderPosition('plc');
						break;
						case 'nodemcu':
							is_ok = spa.main.setSliderPosition('nodemcu');
						break;
						case 'nodesnap7':
							is_ok = spa.main.setSliderPosition('nodesnap7');
						break;
						default: 
							spa.main.setSliderPosition('manage');
							delete anchor_map_proposed.main;
							$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
					}
				}

				if(!is_ok){
					if(anchor_map_previous){
						$.uriAnchor.setAnchor(anchor_map_previous, null, true);
						stateMap.anchor_map = anchor_map_previous;
					}else{
						delete anchor_map_proposed.chat;
						$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
					}
				}
				return false;
			}
			/*
			setChatAnchor = function(position_type){
				console.log("setChatAnchor");
				console.log(changeAnchorPart({chat :  position_type}));
				return changeAnchorPart({chat :  position_type});
			}
			*/

			setMainAnchor = function(position_type){
				return changeAnchorPart({main :  position_type});
			}
			
			initModule =  function($container){
				stateMap.$container = $container;
				$container.html(configMap.main_html);//string html
				console.log($container);
				setJqueryMap();//find head,main,footer
				//console.log(configMap.anchor_schema_map);
				$.uriAnchor.configModule({
					schema_map : configMap.anchor_schema_map
				});
				
				/*spa.chat.configModule({
					set_chat_anchor : setChatAnchor,
					chat_model      : spa.model.chat,
					people_model    : spa.model.people
				});
				*/
				spa.main.configModule({
					set_main_anchor : setMainAnchor,
					main_model      : spa.model.main
				})

				/*spa.chat.initModule(jqueryMap.$container);*/
				spa.main.initModule(jqueryMap.$container);
				/*spa.avtr.configModule({
					chat_model : spa.model.chat,
					people_model : spa.model.people
				});*/
				spa.avtr.configModule({
					main_model : spa.model.main
				});
				//console.log(jqueryMap.$nav);
				//spa.avtr.initModule(jqueryMap.$nav);
				
				$(window).bind('hashchange', onHashchange).trigger('hashchange');
				
				/*$.gevent.subscribe($container, 'spa-login', onLogin);
				$.gevent.subscribe($container, 'spa-logout', onLogout);

				jqueryMap.$acct.text('please sign-in').bind('utap', onTapAcct);*/

				
			};

			return { initModule : initModule };
	}());
	return spa.shell;
}));
