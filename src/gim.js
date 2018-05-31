import Ticker from './ticker.js'
import Stage from './stage.js'
import Assets from './assets.js'
import Keyboard from './keyboard.js'

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