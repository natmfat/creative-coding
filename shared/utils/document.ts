import { jsh } from "./jsh";

export function title(title: string) {
  document.title = `${document.title} | ${title}`;

  document.body.appendChild(
    jsh.span(
      {
        className:
          "fixed bottom-5 left-1/2 -translate-x-1/2 text-sm px-4 py-2 rounded-md border shadow-md whitespace-nowrap",
      },
      title,
      " • ",
      jsh.span({ className: "text-slate-400" }, `#${getSketchID()}`),
    ),
  );
}

export function getSketchID(
  sketchNumber: number | string = location.href,
): string {
  sketchNumber = parseInt(
    sketchNumber
      .toString()
      .replace("index.html", "/")
      .split("/")
      .filter((segment) => segment.length > 0)
      .pop() || "",
  );

  return (isNaN(sketchNumber) ? 0 : sketchNumber).toString().padStart(6, "0");
}
