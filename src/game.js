import Emitter from './emitter.js'
import Stage from './stage.js'
import Assets from './assets.js'

class Ticker extends Emitter {
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

let assets = new Assets()
let stage = new Stage(500, 500)
let ticker = new Ticker()

assets.load([
	'../assets/bird.png'
])

assets.on('load', (e) => {
	console.log(e.path + ' loaded')
})

assets.on('complete', (e) => {
	console.log('all assets loaded')
})


ticker.on('update', () => {
	stage.clear()
	stage.render()
})

ticker.start();
