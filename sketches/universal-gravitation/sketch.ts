import { title } from "shared/utils/document";

import Sketch from "./engine/Sketch";
import Sun from "./components/Sun";
import Satellite from "./components/Satellite";

title("Universal Gravitation");

const sketch = new Sketch({
  container: document.getElementById("app")!,
  useControls: true,
});

const sun = new Sun();
sketch.add(sun);
for (let i = 0; i < 30; i++) {
  sketch.add(new Satellite({ sun }));
}

sketch.core();
