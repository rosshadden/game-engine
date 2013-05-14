define(function(){
	return function(input){
		input.register(/^(|left|middle|right)click$/, {
			on: function(){
				console.log('CLICKITY CLACK.');
			}
		});
	};
});
