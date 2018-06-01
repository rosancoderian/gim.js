import Emitter from './emitter.js'
import Ticker from './ticker.js'
import Stage from './stage.js'

export default class Game extends Emitter {
	constructor (w, h) {
		super()
		this.ticker = new Ticker()
		this.stage = new Stage(w, h)
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