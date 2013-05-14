define([
	'./lib/index',
	'./core/index',
	'./audio/index',
	'./camera/index',
	'./events/index',
	'./input/index',
	'./math/index',
	'./network/index',
	'./utilities/index'
], function(lib, engine, audio, camera, events, input, math, network, utilities){
	'use strict';

	engine.lib = lib;
	// audio(engine);
	// camera(engine);
	// events(engine);
	// input(engine);
	engine.input = input;
	// math(engine);
	// network(engine);
	engine.utilities = utilities;

	return engine;
});
