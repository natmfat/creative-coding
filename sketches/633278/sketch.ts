import { createPalette } from "shared/utils/color";
import { title } from "shared/utils/document";
import * as THREE from "three";

type SketchArgs = {
  container: HTMLElement;
  orthographicZoom?: number;
};

title("Structures");

class Sketch {
  container: HTMLElement = document.body;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;

  private orthographicZoom: number = 0;
  private animationId: number = 0;
  private playing: boolean = false;

  update = () => {};

  constructor(
    { container, orthographicZoom }: SketchArgs,
    callback: (sketch: Sketch) => void
  ) {
    this.container = container;
    this.orthographicZoom = orthographicZoom ?? this.orthographicZoom;

    // setup all important properties
    this.scene = new THREE.Scene();
    this.camera = orthographicZoom
      ? new THREE.OrthographicCamera()
      : new THREE.PerspectiveCamera(45, this.aspect, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.clock = new THREE.Clock();

    // initialize instance-mode like sketch
    callback(this);
    this.mount();
  }

  get width() {
    return this.container.offsetWidth;
  }

  get height() {
    return this.container.offsetHeight;
  }

  get aspect() {
    return this.width / this.height;
  }

  resize() {
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = this.aspect;
    } else if (this.camera instanceof THREE.OrthographicCamera) {
      const zoom = this.orthographicZoom;
      const camera = this.camera;

      camera.left = -zoom * this.aspect;
      camera.right = zoom * this.aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      camera.near = -100;
      camera.far = 100;

      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());
    }

    this.camera.updateProjectionMatrix();
  }

  noLoop() {
    this.playing = false;
  }

  mount() {
    this.container.appendChild(this.renderer.domElement);

    addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.start();
  }

  start() {
    this.playing = true;

    const animate = () => {
      if (!this.playing) {
        cancelAnimationFrame(this.animationId);
        this.clock.stop();
      }

      this.animationId = requestAnimationFrame(animate);
      this.update();
      this.renderer.render(this.scene, this.camera);
    };

    this.clock.start();
    this.animationId = requestAnimationFrame(animate);
  }
}

new Sketch(
  { container: document.getElementById("app")!, orthographicZoom: 2 },
  (sketch) => {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const palette = createPalette().map(
      (color) => new THREE.MeshStandardMaterial({ color })
    );

    sketch.renderer.setClearColor("white", 1.0);
    sketch.camera.lookAt(new THREE.Vector3());

    for (let i = 0; i < 40; i++) {
      const cube = new THREE.Mesh(
        cubeGeometry,
        palette[THREE.MathUtils.randInt(0, palette.length - 1)]
      );

      cube.scale.set(Math.random(), Math.random(), Math.random());
      cube.scale.multiplyScalar(0.5);
      cube.position.set(
        THREE.MathUtils.randFloat(-1, 1),
        THREE.MathUtils.randFloat(-1, 1),
        THREE.MathUtils.randFloat(-1, 1)
      );

      sketch.scene.add(cube);
    }

    sketch.scene.add(new THREE.AmbientLight("hsl(0, 0%, 40%)"));

    const light = new THREE.DirectionalLight("white", 2);
    light.position.set(0, 0, 4);
    sketch.scene.add(light);

    let targetMouseX = 0;
    let mouseX = 0;
    addEventListener("mousemove", (e) => {
      targetMouseX = e.clientX - sketch.width / 2;
    });

    sketch.update = () => {
      const delta = sketch.clock.getDelta();
      mouseX = THREE.MathUtils.lerp(mouseX, targetMouseX, delta);

      sketch.scene.rotation.y = mouseX * 0.001;
    };
  }
);
