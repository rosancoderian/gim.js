import Emitter from './emitter.js'
import Stage from './stage.js'

export default class Ticker extends Emitter {
	constructor () {
		super()
		this.raf = null
	}

	start () {
		this.emit('start');
		this._update(0);
	}

	stop () {
		this.emit('stop')
		if (this.raf) {
			cancelAnimationFrame(this.raf)
		}
	}
	
	_update (time) {
		this.emit('update', this);
		requestAnimationFrame(time => this._update(time));
	}
}

let stage = new Stage(500, 500)
let ticker = new Ticker()

ticker.on('update', () => {
	stage.clear()
	stage.render()
})

ticker.start();
