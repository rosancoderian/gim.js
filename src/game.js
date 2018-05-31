import Emitter from './emitter.js'
import Stage from './stage.js'
import Assets from './assets.js'
import Keyboard from './keyboard.js';

class Ticker extends Emitter {
	constructor () {
		super()
		this.fps = 60
		this._raf = null
		this._last = null
		this._now = null
		this._dt = null
		this._accumulator = 0
		this._delta = 1E3 / this.fps
		this._step = 1 / this.fps

	}

	start () {
		requestAnimationFrame(this._update.bind(this))
		this.emit('start')
	}

	stop () {
		if (this._raf) {
			cancelAnimationFrame(this._raf)
			this.emit('stop')
		}
	}
	
	_update () {
		this._raf = requestAnimationFrame(this._update.bind(this))
		this._now = performance.now()
		this._dt = this._now - this._last
		this._last = this._now
		if (this._dt > 1E3) {
			return
		}
		this._accumulator += this._dt
		while (this._accumulator >= this._delta) {
			this.emit('update', this._step)
			this._accumulator -= this._delta;
		}
	}
}

let assets = new Assets()

assets.load([
	'/assets/bird.png'
])

assets.on('load', (e) => {
	console.log(e.path + ' loaded')
})

assets.on('complete', (e) => {
	console.log('all assets loaded')

	let stage = new Stage(500, 500)
	let ticker = new Ticker()
	let keyboard = new Keyboard()

	let bird = {
		x: 0,
		y: 0,
		image: assets.get('/assets/bird.png'),
		update (step) {
			this.x += 15
			if (this.x >= stage.canvas.width) {
				this.x = -this.image.width
			}
		},
		render (ctx) {
			ctx.drawImage(assets.get('/assets/bird.png'), this.x, this.y)
		}
	}
	
	stage.on('render', (stage) => {
		bird.render(stage.ctx)
	})
	
	ticker.on('start', () => {
		console.log('ticker start')
	})

	ticker.on('update', () => {
		bird.update()
		stage.clear()
		stage.render()
	})
	
	ticker.start()
})