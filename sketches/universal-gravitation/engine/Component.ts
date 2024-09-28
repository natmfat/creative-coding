import { BoxGeometry, Group, Mesh, MeshBasicMaterial, Object3D } from "three";
import Sketch from "./Sketch";

export default class Component {
  protected object!: Object3D | Group;
  protected sketch!: Sketch;

  onMount() {}

  setObject(object: Component["object"]) {
    this.object = object;
  }

  getObject() {
    return this.object;
  }

  createObject(): Component["object"] {
    return new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: "red" }),
    );
  }

  setSketch(sketch: Sketch) {
    this.sketch = sketch;
  }

  update() {}
}

/**
 * Create a component through a function
 * @param meshFactory - Function that returns an object
 * @returns An instance of the component
 */
export const createComponent = (meshFactory: () => Component["object"]) => {
  class FunctionalComponent extends Component {
    createObject() {
      return meshFactory();
    }
  }

  return new FunctionalComponent();
};
