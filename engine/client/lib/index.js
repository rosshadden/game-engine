define([
	'./three/three',
	'./jquery',
	'./dependencies'
], function(_three, _jquery, dependencies){
	var lib = {};
	dependencies(lib);
	return lib;
});
