import { jsh } from "./jsh";

export const DEFAULT_SKETCH = "000000";

export function title(title: string) {
  document.title = `${document.title} | ${title}`;

  document.body.appendChild(
    jsh.span(
      {
        className:
          "fixed bottom-5 left-1/2 -translate-x-1/2 text-sm px-4 py-2 rounded-md border shadow-md whitespace-nowrap bg-white",
      },
      title,
      " • ",
      jsh.span({ className: "text-slate-400" }, `@natmfat`),
    ),
  );
}

export function getSketchID(
  sketchNumber: number | string = location.href,
): string {
  return (
    sketchNumber
      .toString()
      .replace("/index.html", "")
      .replace(".png", "")
      .split("/")
      .filter((comp) => comp.trim().length > 0)
      .pop()
      ?.trim() || DEFAULT_SKETCH
  ).toString();
}

export function isTitled(sketchNumber: string) {
  return sketchNumber.startsWith("~") || isNaN(parseInt(sketchNumber));
}
