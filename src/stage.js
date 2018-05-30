import Emitter from './emitter.js'

export default class Stage extends Emitter {
    constructor (width, height) {
        super()
        this.canvas = document.createElement('canvas')
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        document.body.appendChild(this.canvas);
    }

    clear (fill = '#000', x = 0, y = 0, width = this.canvas.width, height = this.canvas.height) {
        this.ctx.fillStyle = fill
        this.ctx.fillRect(0, 0, width, height)
    }

    render () {
        this.emit('render', this)
    }
}