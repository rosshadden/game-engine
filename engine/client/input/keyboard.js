define(['../lib/keyboard'], function(keyboard){
	return function(input){
		input.register(/^\w+(?:\s?[+,]\s?\w+)*$/, {
			on: function(keys){
				console.log('on', 'KEYS KEYS KEYS.', keys);
			},

			while: function(keys){
				return keyboard.combo.active(keys);
			}
		});
	};
});
