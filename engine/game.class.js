class Game {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const ambient = new THREE.AmbientLight(0x707070);
    this.scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    this.scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00aaff });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this._animate();
    window.addEventListener('resize', () => this._onWindowResize(this), false);
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  _onWindowResize(game) {
    game.camera.aspect = window.innerWidth / window.innerHeight;
    game.camera.updateProjectionMatrix();
    game.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
