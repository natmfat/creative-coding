import * as THREE from "three";

export { THREE };

export default class p3 {
  clock!: THREE.Clock;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  renderer!: THREE.WebGLRenderer;

  private canvas: HTMLCanvasElement = document.createElement("canvas");

  private animationId: number = 0;
  private playing: boolean = false;

  private orthographicZoom: number = 0;

  width: number = 0;
  height: number = 0;

  mouseX: number = 0;
  mouseY: number = 0;

  setup = () => {};
  update = () => {};
  windowResized = () => {};

  constructor(callback: (sketch: p3) => void) {
    callback(this);
    this.setup();
    this.mount();
  }

  ortho(zoom: number) {
    this.camera = new THREE.OrthographicCamera();
    this.orthographicZoom = zoom;

    return this.canvas;
  }

  perspective(fov: number = 45, near: number = 0.1, far: number = 100) {
    this.camera = new THREE.PerspectiveCamera(fov, this.aspect, near, far);

    return this.canvas;
  }

  background(color: THREE.ColorRepresentation, alpha: number = 1) {
    this.renderer.setClearColor(color, alpha);
  }

  resizeCanvas(width: number, height: number) {
    this.width = width;
    this.height = height;

    // assign width & height to canvas
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
  }

  createCanvas(width: number, height: number) {
    this.resizeCanvas(width, height);

    // setup all important properties
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });

    if (this.camera) {
      this.onResize();
    }

    return this.canvas;
  }

  get aspect() {
    return this.width / this.height;
  }

  noLoop() {
    this.playing = false;
  }

  private onResize() {
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
    this.windowResized();
  }

  private onMouseMove(e: MouseEvent) {
    const canvasBBox = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - canvasBBox.left - this.width / 2;
    this.mouseY = e.clientY - canvasBBox.top - this.height / 2;
  }

  mount() {
    document.body.appendChild(this.renderer.domElement);
    addEventListener("resize", this.onResize.bind(this));
    addEventListener("mousemove", this.onMouseMove.bind(this));

    this.onResize();
    this.start();
  }

  start() {
    this.playing = true;

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      if (!this.playing) {
        cancelAnimationFrame(this.animationId);
        this.clock.stop();
      }

      this.update();
      this.renderer.render(this.scene, this.camera);
    };

    this.clock.start();
    this.animationId = requestAnimationFrame(animate);
  }
}
