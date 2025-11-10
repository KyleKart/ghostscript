// html.js

export function el(tag, children = []) {
  const element = document.createElement(tag);

  if (!Array.isArray(children)) children = [children];

  for (const child of children) {
    if (child instanceof Node) element.appendChild(child);
    else if (Array.isArray(child)) child.forEach(c => element.appendChild(c instanceof Node ? c : document.createTextNode(c)));
    else element.appendChild(document.createTextNode(child));
  }

  return element;
}

export const body = document.body;
export const head = document.head;

export const div = (...args) => el("div", ...args);
export const p = (...args) => el("p", ...args);
export const h1 = (...args) => el("h1", ...args);
export const h2 = (...args) => el("h2", ...args);
export const h3 = (...args) => el("h3", ...args);
export const span = (...args) => el("span", ...args);
export const button = (...args) => el("button", ...args);