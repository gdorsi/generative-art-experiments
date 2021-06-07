const ns = "http://www.w3.org/2000/svg";

export function create(tagName, attrs) {
  const tag = document.createElementNS(ns, tagName);

  for (let key in attrs) {
    tag.setAttributeNS(null, key, attrs[key]);
  }

  return tag;
}

export function blankCanvas(w = 400, h = 200) {
  return create("svg", {
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "xMidYMid slice",
  });
}

export function rect(attrs) {
  return create("rect", attrs);
}

export function triangle({ width, height, x = 0, y = 0, ...attrs }) {
  const d = `
    M ${x},${y}
    l ${width},${0}
    l ${-width / 2},${height} z
  `;

  return create("path", {
    d,
    ...attrs,
  });
}

export function petal({ width, height, x = 0, y = 0, ...attrs }) {
  const stepX = width / 2;
  const stepY = height / 2;

  const d = `
    M ${x},${y}
    t ${stepX},${stepY}
    t ${stepX},${-stepY}
    t ${-stepX},${-stepY}
    t ${-stepX},${stepY} z
  `;

  return create("path", {
    d,
    ...attrs,
  });
}

export function bird({ width, height, x = 0, y = 0, ...attrs }) {
  const stepX = width / 2;
  const stepY = height / 2;

  const d = `
    M ${x},${y}
    s ${stepX},${stepY} ${width},0
    s ${stepX},${-stepY}${-width},0 z
  `;

  return create("path", {
    d,
    ...attrs,
  });
}

export function leaf({ width, height, x = 0, y = 0, ...attrs }) {
  const stepX = width / 2;
  const stepY = height / 2;

  const d = `
    M ${x},${y}
    q ${stepX},${stepY} ${width},0
    q ${-stepX},${-stepY}${-width},0 z
  `;

  return create("path", {
    d,
    ...attrs,
  });
}
