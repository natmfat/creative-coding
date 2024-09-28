import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Component from "./Component";

interface SketchProps {
  container: HTMLElement;
  useControls: boolean;
}

export default class Sketch {
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private scene: Scene;
  private controls: OrbitControls | undefined;

  private container: SketchProps["container"];

  private animationId = 0;
  private components: Component[] = [];

  constructor({ container, useControls }: SketchProps) {
    this.container = container;

    this.renderer = this.createRenderer();
    this.camera = this.createCamera();
    this.scene = this.createScene();

    if (useControls) {
      this.controls = this.createControls();
    }
  }

  get size() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    return {
      width,
      height,
      aspectRatio: width / height,
    };
  }

  private createControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    return controls;
  }

  private createScene() {
    const scene = new Scene();
    scene.background = new Color("black");

    return scene;
  }

  getScene() {
    return this.scene;
  }

  private createCamera() {
    const ar = this.size.aspectRatio;
    const camera = new PerspectiveCamera(75, ar, 0.1, 1000);
    camera.position.z = 10;

    return camera;
  }

  private createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(this.size.width, this.size.height);
    renderer.setPixelRatio(devicePixelRatio);

    this.container.appendChild(renderer.domElement);

    return renderer;
  }

  /**
   * Add a number of components to the scene
   * @param components - List of components
   */
  add(...components: Component[]) {
    for (const component of components) {
      const object = component.createObject();

      component.setSketch(this);
      component.setObject(object);
      component.onMount();

      this.components.push(component);
      this.scene.add(object);
    }
  }

  /**
   * Begin updating & animating the sketch
   */
  core() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      // update components
      this.controls && this.controls.update();
      this.components.forEach((component) => {
        component.update();
      });

      // render
      this.renderer.render(this.scene, this.camera);
    };

    this.animationId = requestAnimationFrame(animate);
  }

  /**
   * Stop updating & animating the sketch
   */
  stop() {
    cancelAnimationFrame(this.animationId);
  }
}
