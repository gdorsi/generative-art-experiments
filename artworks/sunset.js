import { range, random } from "../lib/math/index.js";
import { create, blankCanvas } from "../lib/svg/index.js";
import { hsl } from "../lib/color/index.js";

export function renderSunset() {
  const canvas = blankCanvas();

  const stripes = range(0, 300, () => random(5, 15))
    .map((value, i, array) => [value, array[i + 1]])
    .filter(([, end]) => end !== undefined)
    .map(([start, end]) =>
      create("rect", {
        height: end - start + 5,
        width: 400,
        fill: hsl(
          random([random(10, 40), random(180, 200)]),
          60,
          random(30, 65)
        ),
        stroke: hsl(random(20, 40), 50, random(80, 90)),
        "stroke-width": 0.2,
        x: 0,
        y: start - 5,
        style: `transform: rotate(${random(
          -0.7,
          0.7,
          false
        )}deg)`,
      })
    );

  canvas.append(...stripes);

  canvas.append(
    create("circle", {
      fill: hsl(10, random(50, 80), random(40, 60)),
      cx: random(250, 300),
      cy: 50,
      r: random(10, 20),
    })
  );

  return canvas;
}
