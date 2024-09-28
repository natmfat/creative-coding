import {
  Color,
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
  Vector3,
} from "three";
import Component from "../engine/Component";
import Sun from "./Sun";

interface SatelliteProps {
  sun: Sun;
}

export default class Satellite extends Component {
  private radius: number;
  private sun: Sun;

  private vel: Vector3;
  private acc: Vector3;

  constructor({ sun }: SatelliteProps) {
    super();
    this.sun = sun;
    this.radius = Math.random() / 2 + 0.25;
    this.vel = new Vector3(0.2, 0);
    this.acc = new Vector3(0, 0, 0);
  }

  createObject() {
    return new Mesh(
      new SphereGeometry(this.radius, 20, 20),
      new MeshLambertMaterial({ color: Satellite.createRandomColor() }),
    );
  }

  onMount() {
    const position = new Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5,
    )
      .multiplyScalar(15)
      .add(
        this.calculateBaseForce()
          .addScalar(this.radius)
          .addScalar(this.sun.radius),
      );

    this.object.position.set(position.x, position.y, position.z);
  }

  calculateBaseForce() {
    const force = this.sun
      .getObject()
      .position.clone()
      .sub(this.object.position);

    return force;
  }

  calculateForce() {
    const force = this.calculateBaseForce();

    const r = Math.max(
      Math.min(force.manhattanLength(), this.radius + this.sun.radius),
      4,
    );

    force.normalize();
    force.multiplyScalar(0.1 / r ** 2);

    return force;
  }

  update() {
    this.acc.add(this.calculateForce());
    this.vel.add(this.acc);
    this.object.position.add(this.vel);
    this.acc.multiplyScalar(0);
  }

  static createRandomColor() {
    const color = new Color(0xffffff);
    color.setHex(Math.random() * 0xffffff);

    return color;
  }
}

/*
universal gravitation
F = G * (m1 * m2) / r^2

const force = planet.pos.copy().sub(this.pos);
                const distance = constrain(
                    force.mag(),
                    planet.radius + this.radius,
                    max(height, width) / 2
                );

                force.setMag(
                    (0.1 * planet.mass * this.mass) / pow(distance, 2)
                );

                this.acc.add(force);
*/

// Math.random() * 0xffffff
