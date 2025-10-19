// input.js

const keys = new Set();
const mouse = { x: 0, y: 0, down: false, button: 0 };

window.addEventListener("keydown", e => keys.add(e.key.toLowerCase()));
window.addEventListener("keyup", e => keys.delete(e.key.toLowerCase()));

window.addEventListener("mousedown", e => {
  mouse.down = true;
  mouse.button = e.button;
});
window.addEventListener("mouseup", () => {
  mouse.down = false;
});
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const input = {
  key(name) {
    return keys.has(name.toLowerCase());
  },

  mouseDown() {
    return mouse.down;
  },

  mouseButton() {
    return mouse.button;
  },

  mousePos() {
    return { x: mouse.x, y: mouse.y };
  },
};

export default input;