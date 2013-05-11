require.config({
	packages: ['entities', 'utilities'],
	paths: {
		'text': 'lib/require.text'
	},
	deps: ['utilities/log', 'lib/three', 'lib/jquery'],
	callback: function(log){
		window.log = log;
	}
});
