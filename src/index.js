import Ticker from './libs/ticker.js'
import Stage from './libs/stage.js'
import Assets from './libs/assets.js'
import Keyboard from './libs/keyboard.js'

let assets = new Assets()

assets.load([
	{ name: 'bird', url: 'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-midflap.png' }
]).then(() => {
	console.log('all assets loaded')

	let stage = new Stage(500, 500)
	let ticker = new Ticker()
	let keyboard = new Keyboard()

	let bird = {
		x: 0,
		y: 0,
		speed: 10,
		image: assets.get('bird'),
		update (step) {
			if (this.x >= stage.canvas.width) {
				this.x = -this.image.width
			}
			if (this.x < -this.image.width) {
				this.x = stage.canvas.width
			}
			if (this.y >= stage.canvas.height) {
				this.y = -this.image.height
			}
			if (this.y < -this.image.height) {
				this.y = stage.canvas.height
			}
			if(keyboard.isDown('right')) {
				this.x += this.speed
			}
			if(keyboard.isDown('left')) {
				this.x -= this.speed
			}
			if(keyboard.isDown('up')) {
				this.y -= this.speed
			}
			if(keyboard.isDown('down')) {
				this.y += this.speed
			}
		},
		render (ctx) {
			ctx.drawImage(this.image, this.x, this.y)
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