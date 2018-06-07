import Emitter from "./emitter";

export default class Keyboard extends Emitter {
    constructor () {
        super()
        this.map = this.mapKey()
        this._pressed = Object.values(this.map).reduce((_pressed, key) => {
            _pressed[key] = false
            return _pressed
        }, {})
        document.addEventListener('keydown', e => {
            let key = this.map[e.which]
            if (this._pressed[key] === false) {
                this._pressed[key] = setInterval(() => {
                    this.emit('down', key)
                }, 1E3 / 60)
            }
        })
        document.addEventListener('keyup', e => {
            let key = this.map[e.which]
            clearInterval(this._pressed[key])
            this._pressed[key] = false
            this.emit('up', key)
        })
    }

    isDown (code) {
        return this._pressed[code] && true
    }

    isUp (code) {
        return !this._pressed[code] && true
    }

    mapKey () {
        let map = {
            8: 'backspace',
            9: 'tab',
            13: 'enter',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            20: 'capslock',
            27: 'esc',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            45: 'insert',
            46: 'delete',
            91: 'leftwindow',
            92: 'rightwindow',
            93: 'select',
            144: 'numlock',
            145: 'scrolllock',
            106: '*',
            107: '+',
            109: '-',
            110: '.',
            111: '/',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            219: '[',
            220: '\\',
            221: ']',
            222: '\''
        }
        // alpha
        for (var i = 0; i < 26; i++) {
            map[65+i] = (10 + i).toString(36);
        }
        // numeric
        for (i = 0; i < 10; i++) {
            map[48+i] = ''+i;
            map[96+i] = 'numpad'+i;
        }
        // fn
        for (i = 1; i < 20; i++) {
            map[111+i] = 'f'+i;
        }
        return map
    }
}