import { hsl } from "../lib/color/index.js";
import { random, range } from "../lib/math/index.js";
import { blankCanvas, leaf, rect } from "../lib/svg/index.js";

export function renderAutumn() {
  const canvas = blankCanvas();

  canvas.append(
    ...range(0, 200, () => random(5, 40))
    .map((value, i, array) => [value, array[i + 1]])
    .filter(([, end]) => end !== undefined)
    .map(([start, end]) =>
      rect({
        height: end - start,
        width: 400,
        fill: hsl(random(10, 40), 50, random(30, 65)),
        stroke: "#000",
        "stroke-width": 0.2,
        x: 0,
        y: start,
      })
    ),
    ...range(0, 600).map(() => {
      const size = random(5, 50);
  
      return leaf({
        height: size,
        width: size,
        fill: hsl(random(10, 40), 60, random(30, 65)),
        stroke: "#000",
        "stroke-width": 0.1,
        x: random(-100, 500),
        y: random(-50, 250),
        style: `transform: rotate(${random(0, 360)}deg)`,
      });
    }),
  )

  return canvas;
}
