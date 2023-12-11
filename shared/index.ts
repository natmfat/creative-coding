import { getSketchID } from "./utils/document";
import { jsh } from "./utils/jsh";

if (window.location.pathname !== "/") {
  throw new Error("do not import index.ts across other files");
  // @todo do something useful (ie: random sketch or next sketch in list)
}

const $sketches = document.getElementById("sketches")!;
const sketches = import.meta.glob("../sketches/**/*.html");

// @audit-ok would use import.meta.env.VITE_SKETCHES_DIR but only literals allowed
Object.keys(sketches)
  .map(getSketchID)
  .filter((sketch) => sketch !== "000000")
  .forEach((sketch) => {
    $sketches.appendChild(
      jsh.a(
        {
          className: "underline hover:drop-shadow-md",
          href: `/sketches/${sketch}/`,
        },
        sketch
      )
    );
  });
