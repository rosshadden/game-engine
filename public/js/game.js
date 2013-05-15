define([
	'engine'
], function(engine){
	window.engine = engine;

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

			//	LIGHTS.
			var light = new THREE.DirectionalLight(0xebf3ff, 1.6);
			light.position.set(0, 140, 500).multiplyScalar(1.1);

			//	CAMERA.
			camera = new THREE.PerspectiveCamera(75, viewport.width / viewport.height, 0.1, 20000);
			camera.position.set(0, -200, 6e2);
			camera.lookAt(new THREE.Vector3(0, 0, 0));

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

			var loader = new THREE.OBJMTLLoader();
			loader.addEventListener('load', function(object){
				player = object.content;
				player.position.set(0, 0, 0);
				player.rotation.x = Math.PI / 2;
				player.scale.set(1e-2, 1e-2, 1e-2);
				scene.add(player);
			});
			loader.load('/models/tidus-high/Tidus - HP.obj', '/models/tidus-high/Tidus - HP.mtl');

			scene.add(light);
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

	var speed = 4;
	var update = function(){
		//	Player.
		if(engine.input.is('w')){
			player.position.y += speed;
			player.rotation.y = Math.PI;
		}
		if(engine.input.is('a')){
			player.position.x -= speed;
			player.rotation.y = -Math.PI / 2;
		}
		if(engine.input.is('s')){
			player.position.y -= speed;
			player.rotation.y = 0;
		}
		if(engine.input.is('d')){
			player.position.x += speed;
			player.rotation.y = Math.PI / 2;
		}

		//	Camera.
		if(engine.input.is('up')){
			camera.position.y += speed;
		}
		if(engine.input.is('left')){
			camera.position.x -= speed;
		}
		if(engine.input.is('down')){
			camera.position.y -= speed;
		}
		if(engine.input.is('right')){
			camera.position.x += speed;
		}
	};

	return function render(){
		requestAnimationFrame(render);
		update();
		renderer.render(scene, camera);
	};
});
