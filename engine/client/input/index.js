define([
	'./mouse',
	'./keyboard'
], function(mouse, keyboard){
	var adapters = [];

	var input = {
		on: function(event, callback){
			adapters.forEach(function(adapter){
				var matches = event.match(adapter.relevance);

				if(matches && ('on' in adapter.handlers)){
					adapter.handlers.on(matches[1], callback);
				}
			});
			return input;
		},

		while: function(event, callback){
			var response = false;
			adapters.forEach(function(adapter){
				var matches = event.match(adapter.relevance);

				if(matches && ('while' in adapter.handlers)){
					response = adapter.handlers.while.apply(null, matches);
				}
			});
			return response;
		},

		trigger: function(){
			return input;
		},

		register: function(relevance, handlers){
			adapters.push({
				relevance: relevance,
				handlers: handlers
			});
			return input;
		}
	};

	mouse(input);
	keyboard(input);

	return input;
});
