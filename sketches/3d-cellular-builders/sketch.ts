import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CellularAutomata } from "./CellularAutomata";

import { title } from "shared/utils/document";

title("3D Cellular Builders");

// global variables
const width = innerWidth;
const height = innerHeight;
const aspectRatio = width / height;

// create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// create scene & camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.z = 100;

const controls = new OrbitControls(camera, renderer.domElement);

const gridSize = 60;
const cellularAutomata = new CellularAutomata(gridSize, gridSize, gridSize);
cellularAutomata.addCellsTo(scene);

renderer.setAnimationLoop(() => {
  cellularAutomata.update();
  controls.update();
  renderer.render(scene, camera);
});

console.log(`rules:
- if you're alive and you have at least one neighbor, you live!
- a cell is born between 2 neighbors
- otherwise, die`);
