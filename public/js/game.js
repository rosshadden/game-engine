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

	var mouse = {
		position: {
			x: 0,
			y: 0
		},
		cache: {}
	};

	var scene, camera, projector, renderer;
	var game = (function(){
		var game = {};

		game.$canvas = null;
		game.money = 1e4;

		game.init = function(){
			scene = new THREE.Scene();

			//	LIGHTS.
			var light = new THREE.PointLight(0xffffff);
			light.position.set(0, 0, 200);

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

			var skyBox = new THREE.Mesh(
				new THREE.CubeGeometry(10000, 10000, 10000),
				new THREE.MeshBasicMaterial({
					color: 0xff0000
				})
			);
			skyBox.flipSided = true;
			scene.fog = new THREE.FogExp2(0x000000, 1e-4);

			scene.add(skyBox);
			scene.add(light);
			scene.add(ground);
		};

		return game;
	})();

	game.init();

	//	EVENTS.
	(function(){
		game.$canvas
			.on('mousedown', function(event){
				event.preventDefault();

				var x = event.offsetX,
					y = event.offsetY;

				if(event.which === 1){
					game.$canvas.css('cursor', 'crosshair');
				}else if(event.which === 2){
					game.$canvas.css('cursor', 'all-scroll');
				}else if(event.which === 3){
					game.$canvas
					.css('cursor', 'move')
					.on('mousemove.drag', function(event){
						camera.position.x += (x - event.offsetX) / 2;
						camera.position.y -= (y - event.offsetY) / 2;
						x = event.offsetX;
						y = event.offsetY;
					});
				}
			})
			.on('mouseup', function(event){
				game.$canvas
				.css('cursor', 'auto')
				.unbind('mousemove.drag');
			})
			.on('mousewheel', function(event){
				var Δ = event.originalEvent.wheelDeltaY;

				var position = camera.position.z - Δ / 2;
				if(1e2 < position && position < 1e3){
					camera.position.z = position;
				}
			})
			.on('mousemove', function(event){
				mouse.position.x = event.clientX;
				mouse.position.y = event.clientY;
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

	var update = function(){
		var modifier = 1;

		if(engine.input.is('shift')){
			modifier = 10;
		}
		if(engine.input.is('a')){
			camera.position.x -= modifier;
		}
		if(engine.input.is('d')){
			camera.position.x += modifier;
		}
		if(engine.input.is('w')){
			camera.position.y += modifier;
		}
		if(engine.input.is('s')){
			camera.position.y -= modifier;
		}
		if(engine.input.is('q')){
			camera.lookAt({});
		}
		if(engine.input.is('e')){
			// camera.lookAt(scene.position);
			camera.lookAt({
				x: mouse.position.x - mouse.cache.x,
				y: -mouse.position.y + mouse.cache.y,
				z: 0
			});
		}else{
			mouse.cache.x = mouse.position.x;
			mouse.cache.y = mouse.position.y;
		}
	};

	return function render(){
		requestAnimationFrame(render);
		update();
		renderer.render(scene, camera);
	};
});
