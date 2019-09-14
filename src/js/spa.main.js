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


		spa.main = (function(){
			var configMap = {
				templateManage : String()
					+'<div class="spa-main-form" style="height:400px; background-color: blue;">'
					+'<form  style="text-align:left; color:#fff;" id="formmain">'
									+'Name:<br>'
									+'<input style="margin:10px;" type="text" name="firstname" id="firstname">'
									+'<br>'
									+'Last name :<br>'
									+'<input style="margin:10px;" type="text" name="lastname" id="lastname">'
									+'<br>'
									+'Address:<br>'
									+'<input  style="margin:10px;" type="text" name="address" id="address">'
									+'<br>'
									+'Features:<br>'
									+'<input  style="margin:10px;" type="text" name="features" id="features">'
									+'<br>'
									+'<br>'
									+ '<input type="submit">Save</input>'
								+'</form>'
					+'</div>'
				,
				templateAzure : String()
					+'<div class="spa-main-form" style="height:400px; background-color: green;">'
					+'<form  style="text-align:left; color:#fff;" id="formmain">'
									+'Azure:<br>'
									+'<input style="margin:10px;" type="text" name="firstname" id="firstname">'
									+'<br>'
									+'Key :<br>'
									+'<input style="margin:10px;" type="text" name="lastname" id="lastname">'
									+'<br>'
									+'Data:<br>'
									+'<input  style="margin:10px;" type="text" name="address" id="address">'
									+'<br>'
									+'Speed:<br>'
									+'<input  style="margin:10px;" type="text" name="features" id="features">'
									+'<br>'
									+'<br>'
									+ '<input type="submit">Save</input>'
								+'</form>'
					+'</div>'
				,templatePLC : String()
					+'<div class="spa-main-form" style="height:400px; background-color: red;">'
					+'<form  style="text-align:left; color:#fff;" id="formmain">'
									+'Name:<br>'
									+'<input style="margin:10px;" type="text" name="firstname" id="firstname">'
									+'<br>'
									+'Last name :<br>'
									+'<input style="margin:10px;" type="text" name="lastname" id="lastname">'
									+'<br>'
									+'Address:<br>'
									+'<input  style="margin:10px;" type="text" name="address" id="address">'
									+'<br>'
									+'Features:<br>'
									+'<input  style="margin:10px;" type="text" name="features" id="features">'
									+'<br>'
									+'<br>'
									+ '<input type="submit">Save</input>'
								+'</form>'
					+'</div>'
				,templateNodeMCU : String()
					+'<div class="spa-main-form" style="height:400px; background-color: #8A2BE2;">'
					+'<form  style="text-align:left; color:#fff;" id="formmain">'
									+'Name:<br>'
									+'<input style="margin:10px;" type="text" name="firstname" id="firstname">'
									+'<br>'
									+'Last name :<br>'
									+'<input style="margin:10px;" type="text" name="lastname" id="lastname">'
									+'<br>'
									+'Address:<br>'
									+'<input  style="margin:10px;" type="text" name="address" id="address">'
									+'<br>'
									+'Features:<br>'
									+'<input  style="margin:10px;" type="text" name="features" id="features">'
									+'<br>'
									+'<br>'
									+ '<input type="submit">Save</input>'
								+'</form>'
					+'</div>'
				,
				templateNodeSnap7 : String()
					+'<div class="spa-main-form" style="height:400px; background-color: #8A2BE2;">'
					+'<form  style="text-align:left; color:#fff;" id="formmain">'
									+'Name:<br>'
									+'<input style="margin:10px;" type="text" name="firstname" id="firstname">'
									+'<br>'
									+'IP PLC :<br>'
									+'<input style="margin:10px;" type="text" name="lastname" id="lastname">'
									+'<br>'
									+'Memory address:<br>'
									+'<input  style="margin:10px;" type="text" name="address" id="address">'
									+'<br>'
									+'Start position:<br>'
									+'<input  style="margin:10px;" type="text" name="features" id="features">'
									+'<br>'
									+'<br>'
									+ '<input type="submit">Save</input>'
								+'</form>'
					+'</div>'
				,
				main_html : String() 
					+ '<div class="spa-main">'
						+'<div class="spa-main-head ">'
							+'<ul>'
								+'<li><a class="active" href="#!main=manage">Manage</a></li>'
								+'<li><a  href="#!main=azure">Azure</a></li>'
								+'<li><a  href="#!main=plc">PLC</a></li>'
								+'<li><a  href="#!main=nodemcu">NodeMCU</a></li>'
								+'<li><a  href="#!main=nodesnap7">NodeSnap7</a></li>'
							+'</ul>'
						+'</div>'
						+'<div class="spa-main-body row">'
							+'<div class="col-3" style="float: left; padding: 20px; height: 550px;">'
								+'<p style="color:#fff;">hallo</p>'
							+'</div>'
							+'<div class="col-9" style="float: left; padding:20px; height : 550px;">'
								+'<div class="spa-main-form" style="height:400px; background-color: blue;">'
								+'<form  style="text-align:left; color:#fff;" id="formmain">'
									+'Name:<br>'
									+'<input style="margin:10px;" type="text" name="firstname" id="firstname">'
									+'<br>'
									+'Last name :<br>'
									+'<input style="margin:10px;" type="text" name="lastname" id="lastname">'
									+'<br>'
									+'Address:<br>'
									+'<input  style="margin:10px;" type="text" name="address" id="address">'
									+'<br>'
									+'Features:<br>'
									+'<input  style="margin:10px;" type="text" name="features" id="features">'
									+'<br>'
									+'<br>'
									+ '<button style="margin:10px;" type="click">Save</button>'
								+'</form>'
								+'</div>'
							+'</div>'		
						+'</div>'
					+'</div>',

				settable_main_map : {
					main_model      : true,
					set_main_anchor : true
				},
				main_model      : null,
				set_main_anchor : null
			},

			stateMainMap = {
				$append_target_to_Main : null,
				position_type          : 'manage'
			},

			jqueryMainMap = {},

			configModule, setSliderPosition, onTagToggle,
			setJqueryMap, onTagSave, initModule;

			setJqueryMap = function(){
				var 
				$append_target_to_main = stateMainMap.$append_target_to_main,
				$slider_main = $append_target_to_main.find('.spa-main');
				jqueryMainMap = {
					$slider_main      	  : $slider_main,
					$slider_main_head 	  : $slider_main.find('.spa-main-head'),
					$slider_main_body 	  : $slider_main.find('.spa-main-body'),
					$slider_main_form     : $slider_main.find('.spa-main-form'),
					$slider_main_template : $slider_main.find('.col-9'),
					$window_main      	  : $(window)
				}
			}
			onTagSave = function(event){
				var s = jqueryMainMap.$slider_main_form;
				console.log(s);
			}

 
			onTagToggle = function(event){
				var set_chat_anchor = configMap.set_main_anchor;
				console.log("onTagToggle");
				if(stateMainMap.position_type === 'manage' ){
					set_main_anchor('manage');
				}else if(stateMainMap.position_type === 'azure'){
					set_main_anchor('azure');
				}else if(stateMainMap.position_type === 'plc'){
					set_main_anchor('plc');
				}else{
					set_main_anchor('nodemcu');
				}
			}

			//firstName = document.querySelector('#firstname'),
			//lastName = document.querySelector('#lastname'),
			//address = document.querySelector('#address'),
			//features = document.querySelector('#features');
			//console.log(formList$slider);
			/*formList.addEventListener('submit', function(event){
							event.preventDefault();
							if(firstName.value & lastName.value & address.value & features.value != null){
								return;
							}
							var objectx = {
								firstName : firstName.value,
								lastName  : lastName.value,
								address   : address.value,
								features  : features.value
							};
							window.localStorage.setItem('mainForm', JSON.stringify(objectx));
							console.log(window.localStorage.getItem('mainForm'));
						}, false);
			*/
			setSliderPosition = function(position_type, callback){
				var slider_title, toggle_text, height_px;

				switch(position_type){
					case 'manage':						
						console.log("manage");
						jqueryMainMap.$slider_main.find('.spa-main-form').remove();
						jqueryMainMap.$slider_main_template.append(configMap.templateManage);
						break;
					case 'azure':
						console.log("azure");
						jqueryMainMap.$slider_main.find('.spa-main-form').remove();
						jqueryMainMap.$slider_main_template.append(configMap.templateAzure);
						break;
					case 'plc':
						console.log("plc");
						jqueryMainMap.$slider_main.find('.spa-main-form').remove();
						jqueryMainMap.$slider_main_template.append(configMap.templatePLC);
						break;
					case 'nodemcu':
						console.log("nodemcu");
						jqueryMainMap.$slider_main.find('.spa-main-form').remove();
						jqueryMainMap.$slider_main_template.append(configMap.templateNodeMCU);
						break;
					case 'nodesnap7':
						console.log("nodesnap7");
						jqueryMainMap.$slider_main.find('.spa-main-form').remove();
						jqueryMainMap.$slider_main_template.append(configMap.templateNodeSnap7);
						break;	
					default:
						return false;
				}

				stateMainMap.position_type = '';
				jqueryMainMap.$slider_main.animate(
					{

					});
				return true;
			}

			configModule = function(input_map){
				spa.util.setConfigMap({
					input_map    : input_map,
					settable_map : configMap.settable_main_map,
					config_map   : configMap
				});
				return true;
			}

			initModule = function($append_target_to_main){
				var $main_box;
				stateMainMap.$append_target_to_main = $append_target_to_main;
				stateMainMap.$append_target_to_main.find('.spa-shell-main-content').append(configMap.main_html);
				setJqueryMap();

				stateMainMap.position_type = 'manage';
				//spa.model.initModule();
				//spa.shell.initModule($container);
				var s = jqueryMainMap.$slider_main_form;
				console.log(s);
				jqueryMainMap.$slider_main_form.bind('click', onTagSave);
				return true;
			}			
			return {
				initModule        : initModule,
				setSliderPosition :  setSliderPosition,
				configModule      : configModule
			};
		})();
		return spa.main;
}));
