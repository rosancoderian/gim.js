import Game from './libs/game.js'
import Assets from './libs/assets.js'
import Keyboard from './libs/keyboard.js'
import Mouse from './libs/mouse.js'

let assets = new Assets()

assets.load([
	{ name: 'bird', url: 'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-midflap.png' }
])

assets.on('complete', () => {
	console.log('all assets loaded')

	let game = new Game('canvas', 500, 500)
	let keyboard = new Keyboard()
	let mouse = new Mouse()

	let bird = {
		x: 0,
		y: 0,
		speed: 10,
		velocityX:0,
		velocityY:0,
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
		},
		render (ctx) {
			ctx.drawImage(this.image, this.x, this.y)
		}
	}

	keyboard.on('down', key => {
		if (key == 'right') {
			bird.x += bird.speed
		}
		if (key == 'left') {
			bird.x -= bird.speed
		}
		if (key == 'up') {
			bird.y -= bird.speed
		}
		if (key == 'down') {
			bird.y += bird.speed
		}
	})
	
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