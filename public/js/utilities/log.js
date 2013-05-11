define(function(){
	'use strict';

	var history = [];

	var log = function(){
		var args = Array.prototype.slice.call(arguments);

		if(args.length > 0){
			history.push(args);

			if(window.console){
				window.console.log.apply(window.console, args);
			}
		}

		return methods;
	};

	var clear = function(){
		history = [];

		return methods;
	};

	var getHistory = function(){
		return history.slice();
	};

	var methods = {
		log: log,
		clear: clear,
		history: getHistory
	};

	return log;
});
