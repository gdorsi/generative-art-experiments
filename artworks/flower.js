import { hsl } from "../lib/color/index.js";
import { random, range } from "../lib/math/index.js";
import { blankCanvas, create, leaf, rect } from "../lib/svg/index.js";

function flower({ x, y, size, step }) {
  return range(0, step * 25, () => step).map((v) => {
    return leaf({
      height: size,
      width: size,
      fill: hsl(random(v, v + 30), 60, random(30, 65)),
      stroke: "#000",
      "stroke-width": 0.1,
      x,
      y,
      style: `transform: rotate(${v}deg); transform-origin: 50% 50%;`,
    });
  });
}

export function renderFlower() {
  const canvas = blankCanvas();

  canvas.append(
    ...range(0, 200, () => random(5, 40))
      .map((value, i, array) => [value, array[i + 1]])
      .filter(([, end]) => end !== undefined)
      .map(([start, end]) =>
        rect({
          height: end - start,
          width: 400,
          fill: hsl(random(start, end), 50, random(30, 65)),
          stroke: "#000",
          "stroke-width": 0.2,
          x: 0,
          y: start,
        })
      ),
    ...range(1, 65).reverse().flatMap((v) =>
      flower({
        x: 200 + v,
        y: 100,
        size: v * 5,
        step: Math.max(15, v * 3),
      })
    ),
    create("circle", {
      fill: hsl(random(10, 50), 80, random(40, 60)),
      cx: 200,
      cy: 100,
      r: 3,
      stroke: "#000",
      "stroke-width": 0.2,
    })
  );

  return canvas;
}
