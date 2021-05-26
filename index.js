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
    <filter id="clouds">
      <feTurbulence type="turbulence" baseFrequency="0.02"
          numOctaves="5" result="turbulence"/>
      <feDisplacementMap in2="turbulence" in="SourceGraphic"
          scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="suns">
      <feTurbulence type="turbulence" baseFrequency="0.1"
          numOctaves="3" result="turbulence"/>
      <feDisplacementMap in2="turbulence" in="SourceGraphic"
          scale="2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  `;

  const stripes = range(0, 300, () => random(5, 15))
    .map((value, i, array) => [value, array[i + 1]])
    .filter(([, end]) => end !== undefined)
    .map(([start, end]) =>
        create("rect", {
          height: (end - start) + 5,
          width: 400,
          fill: hsl(random([random(10, 40), random(180, 200)]), 60, random(30, 65)),
          stroke: hsl(random(20, 40), 50, random(80, 90)),
          x: 0,
          y: start - 5,
          style: `filter: url(#clouds)`,
        }),
    );

  canvas.append(...stripes);

  canvas.append(create("circle", {
    fill: hsl(10, random(50, 80), random(40, 60)),
    cx: random(250, 300),
    cy: 50,
    r: random(10, 20),
    style: `filter: url(#suns)`,
  }))

  document.body.appendChild(canvas);
}

render();

document.addEventListener("keyup", render);
