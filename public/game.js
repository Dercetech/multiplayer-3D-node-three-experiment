function jem() {}

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

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.game = game;

  const socket = io();
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUuanMiLCJnYW1lLmNsYXNzLmpzIiwiYm9vdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gamVtKCkge31cbiIsImNsYXNzIEdhbWUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzAsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAxLCAxMDAwKTtcclxuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAzO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcblxyXG4gICAgY29uc3QgYW1iaWVudCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg3MDcwNzApO1xyXG4gICAgdGhpcy5zY2VuZS5hZGQoYW1iaWVudCk7XHJcblxyXG4gICAgY29uc3QgbGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XHJcbiAgICBsaWdodC5wb3NpdGlvbi5zZXQoMCwgMjAsIDEwKTtcclxuICAgIHRoaXMuc2NlbmUuYWRkKGxpZ2h0KTtcclxuXHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAxLCAxKTtcclxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4MDBhYWZmIH0pO1xyXG4gICAgdGhpcy5jdWJlID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuY3ViZSk7XHJcblxyXG4gICAgdGhpcy5fYW5pbWF0ZSgpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHRoaXMuX29uV2luZG93UmVzaXplKHRoaXMpLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBfYW5pbWF0ZSgpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9hbmltYXRlKCkpO1xyXG4gICAgdGhpcy5jdWJlLnJvdGF0aW9uLnggKz0gMC4wMTtcclxuICAgIHRoaXMuY3ViZS5yb3RhdGlvbi55ICs9IDAuMDE7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcbiAgfVxyXG5cclxuICBfb25XaW5kb3dSZXNpemUoZ2FtZSkge1xyXG4gICAgZ2FtZS5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICBnYW1lLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgICBnYW1lLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgfVxyXG59XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbiAgd2luZG93LmdhbWUgPSBnYW1lO1xyXG5cclxuICBjb25zdCBzb2NrZXQgPSBpbygpO1xyXG59KTtcclxuIl19
