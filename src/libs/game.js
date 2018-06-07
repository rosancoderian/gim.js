import Emitter from './emitter.js'
import Ticker from './ticker.js'
import Canvas from './canvas.js'

export default class Game extends Emitter {
	constructor (canvasId, w, h) {
		super()
		this.ticker = new Ticker()
		this.stage = new Stage(canvasId, w, h)
		this.ticker.on('update', dt => {
			this.emit('update', dt, this)
			this.stage.clear()
			this.emit('render', this.stage)
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