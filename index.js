import { range, random } from "./math/index.js";
import { create } from "./svg/index.js";
import { hsl } from "./color/index.js";

let canvas;

function render() {
  canvas?.remove();

  canvas = create("svg", {
    viewBox: "0 0 400 200",
    preserveAspectRatio: "xMidYMid slice"
  });

  for (let i of range(0, 4)) {
    const hue = random(30, 50);

    const stripes = range(0, 400, () => random(3 * i, 10 + 5 * i))
      .map((value, i, array) => [value, array[i + 1]])
      .filter(([, end]) => end !== undefined)
      .map(([start, end]) =>
        create("rect", {
          height: 200,
          width: end - start,
          fill: hsl(hue, random(50, 100), random(0, 100)),
          x: start,
          y: 0,
          style:
            i > 0
              ? `opacity: 0.5; transform: rotate(${random(-1,1,true)}deg)`
              : null,
        })
      );

    canvas.append(...stripes);

    const circles = range(0, 30)
      .map(() => [random(0, 600), random(0, 200), random(1, 20)])
      .map(([x, y, radius]) =>
        create("circle", {
          fill: hsl(hue, random(50, 100), random(0, 100)),
          cx: x,
          cy: y,
          r: radius,
        })
      );

    canvas.append(...circles);
  }

  document.body.appendChild(canvas);
}

render();

document.addEventListener("keyup", render);
