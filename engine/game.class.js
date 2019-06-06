DI.register('Game', function() {
  class Game {
    constructor() {
      if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
      }
      this._lastTimestamp;
      this.clock = new THREE.Clock();
      this.container = document.createElement('div');

      const scene = (this.scene = new THREE.Scene());
      scene.fog = new THREE.Fog(0x000000, 0, 500);

      var ambient = new THREE.AmbientLight(0x111111);
      scene.add(ambient);

      var light = new THREE.SpotLight(0xffffff);
      light.position.set(10, 30, 20);
      light.target.position.set(0, 0, 0);
      if (true) {
        light.castShadow = true;

        light.shadowCameraNear = 20;
        light.shadowCameraFar = 50; //camera.far;
        light.shadowCameraFov = 40;

        light.shadowMapBias = 0.1;
        light.shadowMapDarkness = 0.7;
        light.shadowMapWidth = 2 * 512;
        light.shadowMapHeight = 2 * 512;

        //light.shadowCameraVisible = true;
      }
      scene.add(light);

      const camera = (this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 9000));
      this.camera.position.z = 3;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.shadowMapEnabled = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.setClearColor(scene.fog.color, 1);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth * 1, window.innerHeight * 1, false);
      document.body.appendChild(this.renderer.domElement);

      window.addEventListener('resize', () => this._onWindowResize(this), false);

      // Pointer & controls
      this.controls = {};
      this._initPointerLock();
      this.controls.enabled = true;

      // Cannon
      this.world = {};
      this._initCannon();

      requestAnimationFrame(() => this._loop());
      window.scene = scene;
      window.engine = this;
    }

    _initPointerLock() {
      var element = document.body;
      const { controls } = this;

      var pointerlockchange = function(event) {
        console.warn('POINTERLOCK > changed');
        if (
          document.pointerLockElement === element ||
          document.mozPointerLockElement === element ||
          document.webkitPointerLockElement === element
        ) {
          controls.enabled = true;
          // blocker.style.display = 'none';
        } else {
          controls.enabled = false;
          // blocker.style.display = '-webkit-box';
          // blocker.style.display = '-moz-box';
          // blocker.style.display = 'box';
        }
      };

      var pointerlockerror = function(event) {
        console.warn('POINTERLOCK > error ');
        console.log(event);
      };

      // Hook pointer lock state change events
      document.addEventListener('pointerlockchange', pointerlockchange, false);
      document.addEventListener('mozpointerlockchange', pointerlockchange, false);
      document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

      document.addEventListener('pointerlockerror', pointerlockerror, false);
      document.addEventListener('mozpointerlockerror', pointerlockerror, false);
      document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

      document.addEventListener(
        'click',
        function(event) {
          // Ask the browser to lock the pointer
          element.requestPointerLock =
            element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

          if (/Firefox/i.test(navigator.userAgent)) {
            var fullscreenchange = function(event) {
              if (
                document.fullscreenElement === element ||
                document.mozFullscreenElement === element ||
                document.mozFullScreenElement === element
              ) {
                document.removeEventListener('fullscreenchange', fullscreenchange);
                document.removeEventListener('mozfullscreenchange', fullscreenchange);

                element.requestPointerLock();
              }
            };

            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);

            element.requestFullscreen =
              element.requestFullscreen ||
              element.mozRequestFullscreen ||
              element.mozRequestFullScreen ||
              element.webkitRequestFullscreen;

            element.requestFullscreen();
          } else {
            element.requestPointerLock();
          }
        },
        false
      );

      function unlock(event) {
        // Ask the browser to lock the pointer
        element.requestPointerLock =
          element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        if (/Firefox/i.test(navigator.userAgent)) {
          var fullscreenchange = function(event) {
            if (
              document.fullscreenElement === element ||
              document.mozFullscreenElement === element ||
              document.mozFullScreenElement === element
            ) {
              document.removeEventListener('fullscreenchange', fullscreenchange);
              document.removeEventListener('mozfullscreenchange', fullscreenchange);

              element.requestPointerLock();
            }
          };

          document.addEventListener('fullscreenchange', fullscreenchange, false);
          document.addEventListener('mozfullscreenchange', fullscreenchange, false);

          element.requestFullscreen =
            element.requestFullscreen ||
            element.mozRequestFullscreen ||
            element.mozRequestFullScreen ||
            element.webkitRequestFullscreen;

          element.requestFullscreen();
        } else {
          element.requestPointerLock();
        }
      }

      unlock();
    }

    _initCannon() {
      let sphereShape,
        sphereBody,
        physicsMaterial,
        walls = [],
        balls = [],
        ballMeshes = [],
        boxes = [],
        boxMeshes = [];

      // Setup our world
      this.world = new CANNON.World();
      const { camera, world } = this;
      world.quatNormalizeSkip = 0;
      world.quatNormalizeFast = false;

      var solver = new CANNON.GSSolver();

      world.defaultContactMaterial.contactEquationStiffness = 1e9;
      world.defaultContactMaterial.contactEquationRelaxation = 4;

      solver.iterations = 7;
      solver.tolerance = 0.1;
      var split = true;
      if (split) world.solver = new CANNON.SplitSolver(solver);
      else world.solver = solver;

      world.gravity.set(0, -20, 0);
      world.broadphase = new CANNON.NaiveBroadphase();

      // Create a slippery material (friction coefficient = 0.0)
      physicsMaterial = new CANNON.Material('slipperyMaterial');
      var physicsContactMaterial = new CANNON.ContactMaterial(
        physicsMaterial,
        physicsMaterial,
        0.0, // friction coefficient
        0.3 // restitution
      );
      // We must add the contact materials to the world
      world.addContactMaterial(physicsContactMaterial);

      // Create a sphere
      var mass = 5,
        radius = 1.3;
      sphereShape = new CANNON.Sphere(radius);
      sphereBody = new CANNON.Body({ mass: mass });
      sphereBody.addShape(sphereShape);
      sphereBody.position.set(0, 5, 0);
      sphereBody.linearDamping = 0.9;
      world.add(sphereBody);

      // Create a plane
      var groundShape = new CANNON.Plane();
      var groundBody = new CANNON.Body({ mass: 0 });
      groundBody.addShape(groundShape);
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
      world.add(groundBody);

      this.controls = new PointerLockControls(camera, sphereBody);
      this.scene.add(this.controls.getObject());

      // floor
      var geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
      geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

      var material = new THREE.MeshLambertMaterial({ color: 0xdddddd });

      var mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    }

    _loop() {
      const delta = this.clock.getDelta();
      this.updatePhysics(delta);
      this.updateInput(delta);
      this.updateWorld(delta);
      this.updateCamera(delta);
      this.render();
      requestAnimationFrame(() => this._loop());
    }

    updatePhysics(dt) {
      this.world.step(dt);

      // Update ball positions
      // for (var i = 0; i < balls.length; i++) {
      //   ballMeshes[i].position.copy(balls[i].position);
      //   ballMeshes[i].quaternion.copy(balls[i].quaternion);
      // }
      // // Update box positions
      // for (var i = 0; i < boxes.length; i++) {
      //   boxMeshes[i].position.copy(boxes[i].position);
      //   boxMeshes[i].quaternion.copy(boxes[i].quaternion);
      // }
    }

    updateWorld(dt) {}

    updateInput(dt) {
      if (this.controls.enabled) {
        this.controls.update(dt); // apply physics
      }
    }

    updateCamera(dt) {}

    render() {
      this.renderer.render(this.scene, this.camera);
    }

    _onWindowResize(game) {
      game.camera.aspect = window.innerWidth / window.innerHeight;
      game.camera.updateProjectionMatrix();
      game.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  return Game;
});
