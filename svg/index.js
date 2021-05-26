const ns = "http://www.w3.org/2000/svg";

export function create(tagName, attrs) {
  const tag = document.createElementNS(ns, tagName);

  for (let key in attrs) {
    tag.setAttributeNS(null, key, attrs[key]);
  }

  return tag;
}
