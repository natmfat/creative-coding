if (window.location.pathname !== "/") {
  throw new Error("do not import index.ts across other files");
  // @todo do something useful (ie: random sketch or next sketch in list)
}

const $sketches = document.getElementById("sketches")!;
const sketches = import.meta.glob("../sketches/**/*.html");

// @audit-ok would use import.meta.env.VITE_SKETCHES_DIR but only literals allowed
Object.keys(sketches)
  .map((sketch) => parseInt(sketch.split("/")[2]))
  .filter((sketch) => !isNaN(sketch))
  .forEach((sketch) => {
    const $link = document.createElement("a");
    $link.className = "underline hover:drop-shadow-md";
    $link.href = `/sketches/${sketch}/`;
    $link.textContent = sketch.toString();
    $sketches.appendChild($link);
  });
