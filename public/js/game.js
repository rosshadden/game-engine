define([
	'engine'
], function(engine){
	window.engine = engine;
	var keyboard = engine.lib.keyboard;

	var dimensions = {
		width: 1920,
		height: 1080
	};

	var viewport = {
		width: window.innerWidth,
		height: window.innerHeight
	};

	var player;
	var scene, camera, projector, renderer;
	var game = (function(){
		var game = {};

		game.$canvas = null;
		game.money = 1e4;

		game.init = function(){
			scene = new THREE.Scene();

			//	CAMERA.
			camera = new THREE.PerspectiveCamera(75, viewport.width / viewport.height, 0.1, 20000);
			camera.position.set(0, 0, 8e2);

			projector = new THREE.Projector();

			//	ACTION.
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(viewport.width, viewport.height);
			document.body.appendChild(renderer.domElement);
			this.$canvas = $(renderer.domElement);

			var ground = new THREE.Mesh(
				new THREE.PlaneGeometry(dimensions.width, dimensions.height, 1, 1),
				new THREE.MeshBasicMaterial({
					color: 0x003300
				})
			);

			var loader = new THREE.OBJLoader();
			loader.addEventListener('load', function(event){
				player = event.content;
				player.position.y = -80;
				scene.add(player);
				player.position.set(0, 0, 0);
			});
			loader.load('/models/link/Link Adult.obj');

			scene.add(ground);
		};

		return game;
	})();

	game.init();

	//	EVENTS.
	(function(){
		engine.input
			.on('mousewheel', function(event){
				var Δ = event.wheelDeltaY;

				var position = camera.position.z - Δ / 2;
				if(1e2 < position && position < 1e3){
					camera.position.z = position;
				}
			})
			.on('contextmenu', function(event){
				event.preventDefault();
			});

		$(window).on('resize', function(){
			viewport.width = window.innerWidth;
			viewport.height = window.innerHeight;
			renderer.setSize(viewport.width, viewport.height);
			camera.aspect = viewport.width / viewport.height;
			camera.updateProjectionMatrix();
		});
	})();

	console.log(player);

	var speed = 2;
	var update = function(){
		if(engine.input.is('w')){
			player.position.y += speed;
		}
		if(engine.input.is('a')){
			player.position.x -= speed;
		}
		if(engine.input.is('s')){
			player.position.y -= speed;
		}
		if(engine.input.is('d')){
			player.position.x += speed;
		}
	};

	return function render(){
		requestAnimationFrame(render);
		update();
		renderer.render(scene, camera);
	};
});
