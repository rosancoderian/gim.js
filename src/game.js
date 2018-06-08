import Emitter from './emitter.js'
import Ticker from './ticker.js'
import Canvas from './canvas.js'
import Keyboard from './keyboard.js'
import Mouse from './mouse.js'

export default class Game extends Emitter {
    constructor (canvasId, w, h) {
        super()
        this.ticker = new Ticker()
        this.canvas = new Canvas(canvasId, w, h)
        this.keyboard = new Keyboard(this.canvas)
        this.mouse = new Mouse(this.canvas)
        this.ticker.on('update', dt => {
            this.emit('update', dt, this)
            this.canvas.clear()
            this.emit('render', this.canvas)
        })
    }

    start () {
        this.ticker.start()
        this.emit('start', this)
    }

    stop () {
        this.ticker.stop()
        this.emit('stop')
    }
}