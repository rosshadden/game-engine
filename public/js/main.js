//	I'd much rather not have the dev have to do all this,
//	but I can't think of another way to include require.js,
//	and it is very useful inside the engine.
require.config({
	paths:	{
		'text': 'lib/require.text'
	},

	packages: [{
		name: 'engine',
		location: '/engine',
		main: 'index'
	}],

	deps: ['engine/utilities/log']
});

require(['engine/utilities/log', 'game'], function(log, game){
	window.log = log;
	game();
});
