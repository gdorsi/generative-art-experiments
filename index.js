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

  canvas.innerHTML = `
    <filter id="displacementFilter">
      <feTurbulence type="turbulence" baseFrequency="0.05"
          numOctaves="2" result="turbulence"/>
      <feDisplacementMap in2="turbulence" in="SourceGraphic"
          scale="50" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  `;

  for (let i of range(0, 4)) {
    const hue = random(10, 40);

    const stripes = range(0, 200, () => random(3 * i, 10 + 5 * i))
      .map((value, i, array) => [value, array[i + 1]])
      .filter(([, end]) => end !== undefined)
      .map(([start, end]) =>
        create("rect", {
          height: end - start,
          width: 400,
          fill: i > 0 ? hsl(hue, random(50, 100), random(0, 100)) : hsl(random(180, 200), 40, 40),
          x: 0,
          y: start,
          style:
            i > 0
              ? `opacity: 0.5; filter: url(#displacementFilter)`
              : null,
        })
      );

    canvas.append(...stripes);

    const circles = range(0, 30)
      .map(() => [random(0, 600), random(0, 200), random(1, 20)])
      .map(([x, y, radius]) =>
        create("circle", {
          fill: hsl(random(10, 40), random(50, 80), random(0, 60)),
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
