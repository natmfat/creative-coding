import glsl from "vite-plugin-glsl";
import { defineConfig, loadEnv } from "vite";
import { readdirSync, lstatSync } from "fs";
import { resolve } from "path";

const env = loadEnv("all", process.cwd());
const SKETCHES_DIR = resolve(__dirname, env.VITE_SKETCHES_DIR!);

function createInput() {
  return readdirSync(SKETCHES_DIR)
    .filter((sketch) => lstatSync(resolve(SKETCHES_DIR, sketch)).isDirectory())
    .reduce(
      (acc, sketch) => ({
        ...acc,
        [sketch]: resolve(SKETCHES_DIR, sketch, "index.html"),
      }),
      {
        index: resolve(__dirname, "index.html"),
      },
    );
}

// https://vitejs.dev/guide/build.html#multi-page-app
export default defineConfig({
  plugins: [glsl()],
  build: {
    rollupOptions: {
      input: createInput(),
      external: [resolve("template.html"), resolve("sketch.ts")],
    },
  },
  resolve: {
    alias: {
      shared: resolve(__dirname, "shared"),
    },
  },
});
