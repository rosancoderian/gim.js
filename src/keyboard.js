import Emitter from './emitter.js'

export default class Keyboard extends Emitter {
    constructor (stage) {
        super()
        document.addEventListener('keydown', (e) => {
            this.emit('down', e)
        })
        document.addEventListener('keypress', (e) => {
            this.emit('press', e)
        })
        document.addEventListener('keyup', (e) => {
            this.emit('up', e)
        })
    }
}