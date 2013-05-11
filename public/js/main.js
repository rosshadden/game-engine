//	I'd much rather not have the dev have to do all this,
//	but I can't think of another way to include require.js,
//	and it is very useful inside the engine.
require.config({
	paths:	{
		'engine':	'/engine',
		'text': 'lib/require.text'
	},

	deps: ['engine/utilities/log', 'engine/lib/three', 'engine/lib/jquery'],

	callback: function(log){
		window.log = log;

		require(['game'], function(game){
			game();
		});
	}
});
