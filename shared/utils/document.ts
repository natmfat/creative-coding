import { jsh } from "./jsh";

export function title(title: string) {
  document.title = `${document.title} | ${title}`;

  document.body.appendChild(
    jsh.span(
      {
        className:
          "fixed bottom-6 left-1/2 -translate-x-1/2 text-sm px-4 py-2 rounded-md border shadow-md",
      },
      title,
      jsh.span({ className: "text-slate-400" }, `#${getSketchID()}`)
    )
  );
}

export function getSketchID(): string {
  const sketchNumber = parseInt(
    location.pathname
      .split("/")
      .filter((segment) => segment.length > 0)
      .pop() || ""
  );
  return (isNaN(sketchNumber) ? 0 : sketchNumber).toString().padStart(6, "0");
}
