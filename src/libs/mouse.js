import Emitter from './emitter.js'

export default class Mouse extends Emitter {
    constructor () {
        super()
        document.addEventListener('mousemove', e => this.emit('move', e))
        document.addEventListener('mousedown', e => this.emit('down', e))
        document.addEventListener('mouseup', e => this.emit('up', e))
    }
}