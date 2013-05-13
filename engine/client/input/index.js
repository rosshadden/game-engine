define([
	'./mouse',
	'./keyboard'
], function(mouse, keyboard){
	var adapters = [];

	var input = {
		on: function(){},

		trigger: function(){},

		register: function(relevance, handler){
			adapters.push({
				relevance: relevance,
				handler: handler
			});
		}
	};

	input.mouse = mouse(input);
	input.keyboard = keyboard(input);

	return input;
});
