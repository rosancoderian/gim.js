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

    clear (fill = '#000') {
        this.ctx.fillStyle = fill
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    render () {
        this.emit('render', this)
    }
}