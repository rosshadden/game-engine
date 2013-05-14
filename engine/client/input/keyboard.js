define(['../lib/keyboard'], function(keyboard){
	return function(input){
		input.register(/^(\w+(?:\s?[+,]\s?\w+)*)$/, {
			on: function(keys, callback){
				keyboard.on(keys, callback);
			},

			while: function(keys){
				return keyboard.combo.active(keys);
			}
		});
	};
});
