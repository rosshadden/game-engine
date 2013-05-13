define(function(){
	return function(input){
		input.register(/^(|left|middle|right)click$/, function(){
			console.log('CLICKITY CLACK.');
		});
	};
});
