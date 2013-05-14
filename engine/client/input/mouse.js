define(function(){
	return function(input){
		input.register(/^(mouse(down|up|move|over|out|enter|leave|wheel)|(|dbl)click|contextmenu)$/, {
			on: function(event, callback){
				document.querySelector('canvas').addEventListener(event, callback);
			}
		});
	};
});
