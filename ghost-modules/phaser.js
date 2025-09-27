// phaser.js

const phaserReady = import('https://cdn.jsdelivr.net/npm/phaser@3.85.2/dist/phaser-arcade-physics.min.js')
  .then(() => {
    console.log('Phaser loaded automatically');
    return window.Phaser;
  })
  .catch(err => {
    console.error('Failed to load Phaser:', err);
  });

export const isReady = phaserReady;

export const Game = async (config) => {
  const PhaserLib = await phaserReady;
  return new PhaserLib.Game(config);
};

export const Scene = async ({ preload, create, update }) => {
  const PhaserLib = await phaserReady;
  return new PhaserLib.Class({
    Extends: PhaserLib.Scene,
    preload,
    create,
    update
  });
};

export const onKey = async (scene, key, callback) => {
  const PhaserLib = await phaserReady;
  const k = scene.input.keyboard.addKey(PhaserLib.Input.Keyboard.KeyCodes[key.toUpperCase()]);
  scene.events.on('update', () => {
    if (k.isDown) callback();
  });
};