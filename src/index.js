import Game from './libs/game.js'
import Assets from './libs/assets.js'
import Keyboard from './libs/keyboard.js'
import Mouse from './libs/mouse.js'

let assets = new Assets()

assets.load([
	{ name: 'bird', url: 'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-midflap.png' }
]).then(() => {
	console.log('all assets loaded')

	let game = new Game(500, 500)
	let keyboard = new Keyboard()
	let mouse = new Mouse()

	let bird = {
		x: 0,
		y: 0,
		speed: 10,
		image: assets.get('bird'),
		update (dt, game) {
			if (this.x >= game.stage.width) {
				this.x = -this.image.width
			}
			if (this.x < -this.image.width) {
				this.x = game.stage.width
			}
			if (this.y >= game.stage.height) {
				this.y = -this.image.height
			}
			if (this.y < -this.image.height) {
				this.y = game.stage.height
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
	
	game.on('start', () => {
		console.log('game start')
	})
	
	game.on('update', (dt, game) => {
		bird.update(dt, game)
	})

	game.on('render', (stage) => {
		bird.render(stage.ctx)
	})
	
	game.start()
})