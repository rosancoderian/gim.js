import Emitter from './emitter.js';

class Game extends Emitter {
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

let g = new Game();
g.start();
