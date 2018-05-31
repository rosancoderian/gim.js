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
		this._update();
	}

	stop () {
		this.emit('stop')
		if (this.raf) {
			cancelAnimationFrame(this.raf)
		}
	}
	
	_update (time = 0) {
		this.emit('update');
		requestAnimationFrame(time => this._update(time));
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

	let stage = new Stage(1920, 500)
	let ticker = new Ticker()

	let bird = {
		x: 0,
		y: 0,
		image: assets.get('/assets/bird.png'),
		update () {
			this.x += 5
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