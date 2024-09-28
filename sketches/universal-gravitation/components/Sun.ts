import {
  DirectionalLight,
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
} from "three";
import Component, { createComponent } from "../engine/Component";

export default class Sun extends Component {
  radius = 2;

  onMount() {
    this.sketch.add(
      createComponent(() => {
        const light = new DirectionalLight(0xffffff, 1.5);
        light.position.set(6, 6, 6);

        return light;
      }),
    );
  }

  createObject() {
    return new Mesh(
      new SphereGeometry(this.radius, 40, 40),
      new MeshLambertMaterial({ color: "yellow" }),
    );
  }
}
