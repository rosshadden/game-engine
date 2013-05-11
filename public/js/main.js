require.config({
	packages: ['utilities'],
	paths: {
		'text': 'lib/require.text'
	},
	deps: ['utilities/log', 'lib/three', 'lib/jquery'],
	callback: function(log){
		window.log = log;

		require(['game'], function(game){
			game();
		});
	}
});
