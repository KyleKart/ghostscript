export function el(tag, attrsOrChildren = {}, maybeChildren) {
  let attrs, children;

  if (
    attrsOrChildren == null ||
    Array.isArray(attrsOrChildren) ||
    typeof attrsOrChildren === "string" ||
    typeof attrsOrChildren === "number" ||
    attrsOrChildren instanceof Node
  ) {
    attrs = {};
    children = attrsOrChildren;
  } else {
    attrs = attrsOrChildren || {};
    children = maybeChildren;
  }

  const element = document.createElement(tag);

  // set attributes
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  }

  // normalize children
  if (!Array.isArray(children)) children = [children];

  for (const child of children) {
    appendChild(element, child);
  }

  return element;
}

function appendChild(elm, child) {
  if (child instanceof Node) {
    elm.appendChild(child);
  } else if (Array.isArray(child)) {
    child.forEach(c => appendChild(elm, c));
  } else if (child && child.__isTextNode) {
    // convert text() wrapper to real TextNode
    elm.appendChild(document.createTextNode(child.value));
  } else if (typeof child === "string" || typeof child === "number") {
    elm.appendChild(document.createTextNode(child));
  }
}

// text() helper
export function text(str) {
  return { __isTextNode: true, value: str };
}

// references
export const body = document.body;
export const head = document.head;

// tag helpers
export const div = (...args) => el("div", ...args);
export const p = (...args) => el("p", ...args);
export const h1 = (...args) => el("h1", ...args);
export const h2 = (...args) => el("h2", ...args);
export const h3 = (...args) => el("h3", ...args);
export const span = (...args) => el("span", ...args);
export const button = (...args) => el("button", ...args);