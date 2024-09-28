import { cn } from "./cn";
import { DEFAULT_SKETCH, getSketchID } from "./utils/document";
import { jsh } from "./utils/jsh";

if (window.location.pathname !== "/") {
  throw new Error("do not import index.ts across other files");
  // @todo do something useful (ie: random sketch or next sketch in list)
}

const $sketches = document.getElementById("sketches")!;
const $gallery = document.getElementById("gallery")!;

// @audit-ok would use import.meta.env.VITE_SKETCHES_DIR but only literals allowed
const allSketches = Object.keys(import.meta.glob("../sketches/**/*.html"))
  .map(getSketchID)
  .filter((sketch) => sketch !== DEFAULT_SKETCH);

allSketches.forEach((sketch) => {
  $sketches.appendChild(
    jsh.li(
      {},
      jsh.a(
        {
          className: cn("text-black underline"),
          href: `/sketches/${sketch}/`,
        },
        sketch,
      ),
    ),
  );
});
