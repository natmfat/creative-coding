import { getSketchID } from "./utils/document";
import { jsh } from "./utils/jsh";

if (window.location.pathname !== "/") {
  throw new Error("do not import index.ts across other files");
  // @todo do something useful (ie: random sketch or next sketch in list)
}

const $sketches = document.getElementById("sketches")!;
const $gallery = document.getElementById("gallery")!;

// @audit-ok would use import.meta.env.VITE_SKETCHES_DIR but only literals allowed
const sketches = import.meta.glob("../sketches/**/*.html");
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

const images = import.meta.glob("../public/gallery/*.png");

Object.keys(images)
  .map(getSketchID)
  .filter((sketch) => sketch !== "000000")
  .forEach((sketch) => {
    $gallery.appendChild(
      jsh.a(
        {
          className: "block no-underline",
          href: `/sketches/${sketch}/`,
        },
        jsh.img({ src: `/gallery/${sketch}.png`, alt: `Sketch #${sketch}` })
      )
    );
  });
