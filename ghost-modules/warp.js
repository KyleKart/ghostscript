let _info = {};
let _blocks = {};
let _menus = {};

export function info(object) {
    _info = object;
}

export function block(type, text, opcode, values = []) {
    _blocks[opcode] = { type, text, values };
}

export function menus(object) {
    _menus = object;
}

export class Extension {
    getInfo() {
        return {
            ..._info,
            blocks: Object.values(_blocks).map(b => ({
                opcode: b.opcode,
                blockType: Scratch.BlockType[b.type.toUpperCase()],
                text: b.text,
                arguments: b.values.reduce((acc, v) => {
                    acc[v.name] = v;
                    return acc;
                }, {}),
            })),
            menus: _menus
        };
    }
}

export function func(opcode, func) {
    Extension.prototype[opcode] = func;
}

export function register(ext) {
    Scratch.extensions.register(ext);
}