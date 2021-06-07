import { renderAutumn } from "./artworks/autumn.js";
import { renderFlower } from "./artworks/flower.js";
import { renderSunset } from "./artworks/sunset.js";
import { random } from "./lib/math/random.js";

let canvas;

function render() {
  canvas?.remove();

  switch (location.hash.slice(1)) {
    case "sunset":
      canvas = renderSunset();
      break;
    case "autumn":
      canvas = renderAutumn();
      break;
    case "flower":
      canvas = renderAutumn();
      break;
    default:
      canvas = random([renderSunset, renderAutumn, renderFlower])();
  }

  document.body.appendChild(canvas);
}

render();

document.addEventListener("keyup", render);
