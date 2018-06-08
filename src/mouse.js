import Emitter from './emitter.js'

export default class Mouse extends Emitter {
    constructor (canvas) {
        super()
        this.canvas = canvas
        canvas.el.addEventListener('mousemove', e => this.emit('move', e.buttons, this._pos(e), e))
        canvas.el.addEventListener('mousedown', e => this.emit('down', e.buttons, this._pos(e), e))
        canvas.el.addEventListener('mouseup', e => this.emit('up', e.buttons, this._pos(e), e))
    }
    _pos (e) {
        let offsetTop = this.canvas.el.offsetTop
        let offsetLeft = this.canvas.el.offsetLeft
        return {
            x: e.clientX - offsetTop,
            y: e.clientY - offsetLeft
        }
    }
}