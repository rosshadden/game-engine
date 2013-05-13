define(function(){
	return function(input){
		input.register(/^(\w+(\s?[+,]\s?\w+)*)$/, function(){
			console.log('KEYS KEYS KEYS.');
		});
	};
});
