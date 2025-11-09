// html.js

export function el(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  }

  if (!Array.isArray(children)) children = [children];

  for (const child of children) {
    if (child instanceof Node) {
      element.append(child);
    } else if (typeof child === "string" || typeof child === "number") {
      element.append(document.createTextNode(child));
    } else if (Array.isArray(child)) {
      child.forEach(c => {
        element.append(c instanceof Node ? c : document.createTextNode(c));
      });
    }
  }

  return element;
}

export const body = document.body;
export const head = document.head;

export const div = (...args) => el("div", ...args);
export const p = (...args) => el("p", ...args);
export const span = (...args) => el("span", ...args);
export const h1 = (...args) => el("h1", ...args);
export const h2 = (...args) => el("h2", ...args);
export const h3 = (...args) => el("h3", ...args);
export const img = (...args) => el("img", ...args);
export const a = (...args) => el("a", ...args);
export const button = (...args) => el("button", ...args);
export const input = (...args) => el("input", ...args);
export const script = (...args) => el("script", ...args);
export const link = (...args) => el("link", ...args);
export const style = (...args) => el("style", ...args);
export const section = (...args) => el("section", ...args);
export const article = (...args) => el("article", ...args);
export const header = (...args) => el("header", ...args);
export const footer = (...args) => el("footer", ...args);