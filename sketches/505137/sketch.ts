import { title } from "shared/utils/document";

title("American Flag");

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (message) => reject(message));
    image.src = src;
  });
}

async function createFlag(src: string, n = 10) {
  const flag = document.createElement("div");
  Object.assign(flag.style, {
    display: "flex",
  });

  const image = await loadImage(src);

  const aspectRatio = image.naturalWidth / image.naturalHeight;
  const width = 300;
  const height = width / aspectRatio;

  // Resize image
  Object.assign(image, { width, height });
  Object.assign(image.style, { width: width + "px", height: height + "px" });

  // resize canvas
  Object.assign(flag, { width, height });
  Object.assign(flag.style, { width: width + "px", height: height + "px" });

  // create segments
  const segmentWidth = width / n;
  const segments: HTMLDivElement[] = [];

  for (let i = 0; i < n; i++) {
    const segment = document.createElement("div");
    Object.assign(segment.style, {
      backgroundImage: `url(${src})`,
      backgroundPosition: `${-(i * segmentWidth)}px 0%`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${width}px ${height}px`,
      width: segmentWidth + "px",
      height: "100%",
      boxShadow: `${i === 0 ? "0" : "1rem"} 0.5rem 1rem rgba(0, 0, 0, 0.05)`,
    });

    flag.appendChild(segment);
    segments.push(segment);
  }

  let timer = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    timer += 1;
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      segment.style.translate = `0 ${Math.sin(i / 2 + timer / 20) * 5}px`;
    }
  };

  animate();

  return flag;
}

createFlag("americanFlag.png", 20).then((canvas) => {
  document.getElementById("app")?.appendChild(canvas);
});
